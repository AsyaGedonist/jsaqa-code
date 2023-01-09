const { test, expect } = require('@playwright/test');
const user = require('../user.js');

test('authorization netology.ru', async ({page}) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.screenshot({path:'screenshots/main_screen.png'});

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.login);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.pass);
  await page.screenshot({path:'screenshots/goodauth_screen.png'});
  await page.getByTestId('login-submit-btn').click();  

  await expect(page).toHaveURL(/.*profile/);
  await expect(page.locator('h2.src-components-pages-Profile-Programs--title--Kw5NH')).toHaveText('Мои курсы и профессии');
  await page.screenshot({path:'screenshots/profile.png'});
});

test('no-authorization netology.ru', async ({page}) => {
  await page.goto('https://netology.ru/?modal=sign_in');

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.badLogin);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.badPass);
  await page.getByTestId('login-submit-btn').click();

  await expect(page).toHaveURL(/.*?modal=sign_in/);
  // await page.waitForSelector('login-error-hint');
  await expect(page.locator('div.src-reallyShared-components-ui-Form-Hint--hint--V0u0v.inputHint')).toHaveText('Вы ввели неправильно логин или пароль');
  await page.screenshot({path:'screenshots/badauth_screen.png'});
});
