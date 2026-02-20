class NodalOfficerPage {
  constructor(page) {
    this.page = page;

    this.menu = page.locator("//span[text()='Nodal Officers']");
    this.addBtn = page.locator("//button[contains(.,'Add Nodal Officer')]");

    this.nameInput = page.locator("//input[@name='name']");
    this.emailInput = page.locator("//input[@name='email']");
    this.phoneInput = page.locator("//input[@name='phoneNumber']");
    this.addOfficerBtn = page.locator("//button[@type='submit' and text()='Add Officer']");
    this.cancelBtn = page.locator("//button[text()='Cancel']");
  }

  async open() {
    await this.menu.waitFor({ state: 'visible', timeout: 30000 });
    await this.menu.click();
  }

  // ADD nodal officer
  async addOfficer(name, email, phone) {
    await this.addBtn.click();

    await this.nameInput.waitFor({ state: 'visible' });
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);

    await this.addOfficerBtn.waitFor({ state: 'visible' });
    await this.addOfficerBtn.click();
    await this.cancelBtn.click();

    // wait until modal closes
    await this.addOfficerBtn.waitFor({ state: 'detached' });
  }

 
   //  Edit nodal officer

  async editOfficer(index, newName, newEmail, newPhone) {
    await this.page.locator('svg.lucide-square-pen').nth(index).click();

    await this.nameInput.waitFor({ state: 'visible' });
    await this.nameInput.fill(newName);
    await this.emailInput.fill(newEmail);
    await this.phoneInput.fill(newPhone);

    const saveBtn = this.page.locator("//button[text()='Save Changes']");
    await saveBtn.waitFor({ state: 'visible' });
    await saveBtn.click();

    await saveBtn.waitFor({ state: 'detached' });
  }

  //Delete nodal officer

  async deleteOfficer(iconIndex) {
    await this.page.locator('svg.lucide-trash').nth(iconIndex).click();

    const removeBtn = this.page.locator("//button[text()='Remove']");
    await removeBtn.waitFor({ state: 'visible' });

    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      removeBtn.click()
    ]);

    await dialog.accept();

    await removeBtn.waitFor({ state: 'detached' });
  }
}

module.exports = { NodalOfficerPage };