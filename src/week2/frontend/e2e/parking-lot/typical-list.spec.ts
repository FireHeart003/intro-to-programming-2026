import { test, expect, Locator } from '@playwright/test';

test.describe('The parking lot list with typical items', () => {
  let message: Locator = null;
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/parking-lot', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '2',
            title: 'The body without organs',
            description: 'Deleuze & Gatarri -still do not get it!',
            created: '2026-09-21T11:22:13.900Z',
          },
          {
            id: '1',
            title: 'AWS Lambda',
            description: 'Heard about this in an email, what is the deal?',
            created: '2026-09-17T15:50:13.900Z',
          },

          {
            id: '3',
            title: 'Reactivity in Angular',
            description:
              'Signals, computed values, and why they feel different from classic state.',
            created: '2026-09-20T09:15:00.000Z',
          },
        ]),
      });
    });
    await page.goto('/parking-lot/list');
    message = page.getByTestId('empty-message');
  });
  test('should not display empty message', async () => {
    await expect(message).not.toBeVisible();
  });
  test('the list should be visible', async ({ page }) => {
    const list = page.getByTestId('item-list');

    await expect(list).toBeVisible();

    const first = list.first();
    await expect(first).toContainText('The body without organs');
    await page
      .getByRole('listitem')
      .filter({ hasText: 'The body without' })
      .getByRole('radio')
      .click();

    const detailsLinkForFirst = page.getByTestId('details-link-0');
    const detailsLinkForSecond = page.getByTestId('details-link-1');
    await expect(detailsLinkForSecond).not.toBeVisible();
    await expect(detailsLinkForFirst).toBeVisible();
    await detailsLinkForFirst.click();
    await page.waitForURL('**/parking-lot/details/2');

    await page.screenshot({ path: 'details.png', fullPage: true });
  });
});
