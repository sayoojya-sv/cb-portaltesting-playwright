CB Portal – Department 

Automation, Manual & Performance Testing

Project Overview

This project covers end-to-end quality assurance testing of the CB Portal – Department module.
It includes automation testing using Playwright, manual test case creation and execution using TestRail, and performance testing using JMeter to ensure functional correctness, reliability, and system stability.

Tech Stack

Automation Testing: Playwright (JavaScript)
Manual Testing Tool: TestRail
Performance Testing Tool: Apache JMeter
Browsers Tested: Chromium

Test Credentials
  Email: testcb08@gmail.com
  Password: Test@123

Testing Scope
1.Automation Testing (Playwright)
  Department login validation
  Add nodal officer
  Add coordinator
  Send Email 

Manual Testing (TestRail)
 Created detailed test cases and test scenarios
 Covered:
 Positive and negative login scenarios
 Field validation checks
 Role assignment workflows
 UI and functional behavior
 Test cases documented and managed using TestRail

Performance Testing (JMeter – HTTP Test Script Recorder)
 Performance testing of the department login functionality was checked using JMeter’s HTTP Test Script Recorder
 Recorded real-time HTTP/HTTPS requests generated during the login workflow
 Analyzed:
  Response time
  Throughput
  Error rate under simulated load

Project Structure


CB-Portal-Playwright-Automation/
│
├── tests/
│   ├── loginTest.spec.js
│
├── pages/
│   ├── loginPage.js
│   ├── departmentPage.js
│   ├── nodalOfficerPage.js
│   └── coordinatorPage.js
│   └── emailPage.js
|   └── logoutPage.js
├── test-data/
│   ├── intern-data.csv
│   ├── nodalofficer-data.xlsx
├── utils/
│   ├── excelReader.js
|
├── playwright.config.js
├── package.json
└── README.md

Installation & Setup

Clone the Repository
  git clone <repository-url>
  cd CB-Portal-Playwright-Automation
 
Install Dependencies
  npm install
 
Install Playwright Browsers
  -npx playwright install

Running Automation Tests
 Run All Tests
  -npx playwright test
 Run in Headed Mode
 -npx playwright test --headed

View Test Report
 -npx playwright show-report
