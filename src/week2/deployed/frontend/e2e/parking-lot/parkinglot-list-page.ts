import { Locator, Page } from '@playwright/test';

export class ParkinglotListPage {
  readonly page: Page;
  readonly message: Locator;
  constructor(page: Page) {
    this.page = page;
    this.message = page.getByTestId('empty-message');
  }
}
