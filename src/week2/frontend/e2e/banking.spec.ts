import { expect, test } from '@playwright/test';

test.describe('Banking', () => {
  test('Can do a deposit', async ({ page }) => {
    // await page.goto('/');
    // await expect(page.url()).toContain('home');
    // const bankingLink = page.getByRole('link', { name: 'Banking' });

    // await bankingLink.click();
    // await expect(page.url()).toContain('banking');
    await page.goto('/banking');
    const balanceEl = page.getByTestId('balance');
    await expect(balanceEl).toBeVisible();
    await expect(balanceEl).toContainText('$5,000.00');

    const depositLink = page.getByRole('link', { name: 'Deposit' });
    await depositLink.click();

    const amountInput = page.getByTestId('amount-input');

    await amountInput.fill('100');

    const txButton = page.getByRole('button', { name: 'Perform Deposit' });

    await txButton.click();
    await expect(balanceEl).toContainText('$5,110.00');

    // const balanceText = page.getByText('Your Balance is');

    // await expect(balanceText).toContainText('$5,000.00');
  });
});
