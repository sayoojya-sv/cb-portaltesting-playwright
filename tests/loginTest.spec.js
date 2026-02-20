import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { NodalOfficerPage } from '../pages/nodalOfficerPage';
import { CoordinatorPage } from '../pages/coordinatorPage';
import { EmailPage } from '../pages/emailPage';
import { LogoutPage } from '../pages/logoutPage';
import { readExcelData } from '../utils/excelReader';

test.setTimeout(120000);

test('Login → Nodal Officer → Coordinator → Email → Logout', async ({ page }) => {

  const login = new LoginPage(page);
  const nodal = new NodalOfficerPage(page);
  const coordinator = new CoordinatorPage(page);
  const email = new EmailPage(page);
  const logout = new LogoutPage(page);

  //  ADD using Excel
  const addOfficerData = readExcelData('Sheet1')[0];

  await login.open();
  await login.login('testcb08@gmail.com', 'Test@123');

  //nodalofficer
  await nodal.open();

  // Add nodal officer using excel values
  await nodal.addOfficer(
    addOfficerData.name,
    addOfficerData.email,
    addOfficerData.phoneNumber.toString()
  );

  await nodal.editOfficer(2, 'Updated Officer', 'updatedofficer@gmail.com', '9123456789');
  await nodal.deleteOfficer(3);

  //coordinator
  await coordinator.open();
  await coordinator.addCoordinator('Adityy', 'adityy@gmail.com', '8390859784', 'Developer');
  await coordinator.editCoordinator(1);
  await coordinator.deleteCoordinator(1);


  //email
  await email.open();
  await email.sendEmail(
    'test-data/intern-data.csv',
    'Internship Update'
  );

  await logout.logout();
});
