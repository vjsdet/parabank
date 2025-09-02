export function generateRandomUsername(): string {
    const timestamp = Date.now();
    return `user_${timestamp}`;
}

export function generateRandomAmount(min = 10, max = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}