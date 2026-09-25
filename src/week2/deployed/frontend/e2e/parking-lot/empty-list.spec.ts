import { test, expect, Locator } from '@playwright/test';

test.describe('The parking lot list with no items', () => {
  let message: Locator = null;
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/parking-lot', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });
    await page.goto('/parking-lot/list');
    message = page.getByTestId('empty-message');
  });
  test('should display a message', async ({ page }) => {
    await expect(message).toBeVisible();
  });
  test('the message should be', async () => {
    await expect(message).toContainText('Sorry - no items in your parking lot! Add some?');
  });
});
