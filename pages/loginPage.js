class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginBtnHome = page.getByRole('button', { name: 'Login', exact: true });
    this.emailInput = page.getByRole('textbox', { name: 'Email ID' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('main').getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('https://cb.ictkerala.org/');
  }

  async login(email, password) {
    await this.loginBtnHome.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // captcha
    await this.page.waitForTimeout(10000);

    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };
