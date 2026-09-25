import { test, expect } from '@playwright/test';
import { ParkingLotDetailsItem } from '../../src/app/areas/shared/api/types.gen';

const testDataFortyType: ParkingLotDetailsItem = {
  id: '42',
  title: 'Demo Thing',
  description: 'Stuff and other stuff',
  created: new Date().toISOString(),
  notes: [
    { id: '44', content: 'Do this stuff, it is good for you', added: new Date().toISOString() },
    { id: '23', content: 'Another Note', added: new Date().toISOString() },
  ],
};

test.describe('Details', () => {
  test.beforeEach(async ({ page }) => {
    page.route('*/**/api/parking-lot/', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });
    page.route('*/**/api/parking-lot/42', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(testDataFortyType),
      });
    });
  });
  test('Some notes', async ({ page }) => {
    await page.goto('/parking-lot/details/42');

    const titleEl = page.getByTestId('title');

    await expect(titleEl).toHaveText('Demo Thing');
  });

  test.skip('No Notes', () => {});
});
