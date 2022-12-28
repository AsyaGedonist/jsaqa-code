const { test, expect } = require('@playwright/test');
const user = require('../user.js');

test('authorization netology.ru', async ({page}) => {
  await page.goto('https://netology.ru/?modal=sign_in');

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.login);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.pass);
  await page.getByTestId('login-submit-btn').click();  


  await expect(page).toHaveURL(/.*profile/);
});
