const { expect } = require('@playwright/test');

class CoordinatorPage {
  constructor(page) {
    this.page = page;

    this.menu = page.locator("//span[text()='Co-ordinator']");
    this.addBtn = page.locator("//button[contains(.,'Add Coordinator')]");

    this.name = page.locator("//input[@name='name']");
    this.email = page.locator("//input[@name='email']");
    this.mobile = page.locator("//input[@name='mobile']");
    this.designation = page.locator("//input[@name='designation']");
  }

  async open() {
    await this.menu.click();
  }

  async addCoordinator(name, email, mobile, designation) {
    await this.addBtn.click();

    await this.name.fill(name);
    await this.email.fill(email);
    await this.mobile.fill(mobile);
    await this.designation.fill(designation);

    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.click("//button[@type='submit' and text()='Add']")
    ]);

    await dialog.accept();
  }

  async editCoordinator(index) {
    await this.page.locator('svg.lucide-square-pen').nth(index).click();

    await this.name.fill('');
    await this.name.fill('Updated Coordinator');

    await expect(this.email).toBeDisabled();

    await this.mobile.fill('');
    await this.mobile.fill('9123456789');

    await this.designation.fill('');
    await this.designation.fill('Senior Developer');

    await this.page.locator("span.inline-block.h-4.w-4.rounded-full").first().click();

    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.click("//button[text()='Update']")
    ]);

    await dialog.accept();
  }

  async deleteCoordinator(index) {
    await this.page.locator('svg.lucide-trash').nth(index).click();

    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.click("//button[text()='Remove']")
    ]);

    await dialog.accept();
  }
}

module.exports = { CoordinatorPage };
