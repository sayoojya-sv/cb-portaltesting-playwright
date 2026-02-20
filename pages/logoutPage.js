class LogoutPage {
  constructor(page) {
    this.page = page;
    this.profile = page.locator("//img[@alt='User']");
    this.logoutBtn = page.locator("//button[text()='Sign Out']");
  }

  async logout() {
    await this.profile.click();
    await this.logoutBtn.click();
  }
}

module.exports = { LogoutPage };
