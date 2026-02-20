class EmailPage {
  constructor(page) {
    this.page = page;

    this.menu = page.locator("//span[text()='Email Send']");
    this.subject = page.locator("#subject");
    this.content = page.locator("textarea");
  }

  async open() {
    await this.menu.waitFor({ state: 'visible', timeout: 30000 });
    await this.menu.click();
  }

  async sendEmail(csvPath, subjectText, body) {
    await this.page.getByRole('button', { name: 'Upload CSV' }).click();
    await this.page.locator("input[type='file']").first().setInputFiles(csvPath);

    await this.subject.fill(subjectText);
    await this.content.fill('body');

    await this.page.getByRole('button', { name: 'Preview' }).click();
    await this.page.waitForTimeout(2000);

    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.page.getByRole('button', { name: 'Send Email' }).click();
  }
}

module.exports = { EmailPage };
