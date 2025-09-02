import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../../pages/registrationPage";
import { LoginPage } from "../../pages/loginPage";
import { OpenAccountPage } from "../../pages/openAccountPage";
import { AccountOverviewPage } from "../../pages/accountOverviewPage";
import { BillPaymentPage } from "../../pages/billPaymentPage";
import { FundsTransferPage } from "../../pages/fundsTransferPage";
import {
  generateRandomUsername,
  generateRandomAmount,
} from "../../utils/dataUtils";
import { findTransactionsByAmount } from "../../utils/apiUtils";
import { xmlToJson } from "../../utils/jsonUtils";

test("Para Bank Full E2E Flow with Dynamic Funds Transfer", async ({
  page,
}) => {
  const username = generateRandomUsername();
  const password = "Test@123";

  const registration = new RegistrationPage(page);
  const login = new LoginPage(page);
  const openAccount = new OpenAccountPage(page);
  const accountOverview = new AccountOverviewPage(page);
  const billPayment = new BillPaymentPage(page);
  const fundsTransfer = new FundsTransferPage(page);

  // Register new user and login
  await registration.navigate();
  await registration.registerNewUser(username, password);
  expect(await registration.isRegistrationSuccessful()).toBeTruthy();

  expect(await login.isLoginSuccessful()).toBeTruthy();

  // Create saving account
  const savingsAccount = await openAccount.createSavingsAccount();
  expect(savingsAccount).toBeDefined();

  // Transfer funds
  await accountOverview.navigate();
  const balanceBefore = await accountOverview.getAccountBalance(savingsAccount);
  expect(balanceBefore).toBeGreaterThanOrEqual(0);

  const allAccounts = await accountOverview.getAllAccountNumbers();
  const targetAccount = allAccounts.find((acc) => acc !== savingsAccount);
  if (!targetAccount)
    throw new Error("No other account available for transfer");

  const transferAmount = generateRandomAmount(10, 50);
  await fundsTransfer.transferFunds(
    savingsAccount,
    targetAccount,
    transferAmount
  );
  expect(await fundsTransfer.isTransferSuccessful()).toBeTruthy();

  await accountOverview.navigate();
  const balanceAfterTransfer = await accountOverview.getAccountBalance(
    savingsAccount
  );
  expect(balanceAfterTransfer).toBeCloseTo(balanceBefore - transferAmount, 2);

  // Bill payment
  const paymentAmount = generateRandomAmount(10, 100);
  await billPayment.payBill(
    "Electricity",
    123456789,
    paymentAmount,
    savingsAccount
  );
  expect(await billPayment.isPaymentSuccessful()).toBeTruthy();

  // API Validation
  const cookies = (await page.context().cookies())
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  
  // Please note api returning xml response 
  const xmlData = await findTransactionsByAmount(
    savingsAccount,
    paymentAmount,
    cookies
  );

  // Convert XML to JSON
  const jsonData = xmlToJson(xmlData);
  expect(jsonData).toBeDefined();
  expect(jsonData.transactions.transaction.accountId.toString()).toEqual(savingsAccount);
  expect(jsonData.transactions.transaction.amount).toEqual(paymentAmount);
  expect(jsonData.transactions.transaction.type).toEqual("Debit");
});

