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
  await expect(page.locator('h2.src-components-pages-Profile-Programs--title--Kw5NH')).toHaveText('Мои курсы и профессии');
});

// test('no-authorization netology.ru', async ({page}) => {
//   await page.goto('https://netology.ru/?modal=sign_in');

//   await page.getByPlaceholder('Email').click();
//   await page.getByPlaceholder('Email').fill(user.badLogin);
//   await page.getByPlaceholder('Пароль').click();
//   await page.getByPlaceholder('Пароль').fill(user.badPass);
//   await page.getByTestId('login-submit-btn').click();  


//   await expect(page).toHaveURL(/.*profile/);
// });
