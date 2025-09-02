import { request } from '@playwright/test';

// Read XML file
export async function findTransactionsByAmount(savingsAccount: string, amount: number, cookies: string) {
    const apiContext = await request.newContext({
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            Cookie: cookies
        }
    });

    const response = await apiContext.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${savingsAccount}/transactions/amount/${amount}`);
    return response.text();
}