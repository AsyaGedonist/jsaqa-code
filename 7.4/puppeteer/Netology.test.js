let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru/");
}, 30000);

afterEach(() => {
  page.close();
});

describe("Netology page tests", () => { 
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div a:nth-child(2)");
    await firstLink.click();
    await page.waitForSelector('h1');
    const actual = await page.$eval("h1 a.logo__media", link => link.textContent);
    expect(actual).toContain("Медиа");
  }, 30000);

  test("The first link attribute", async () => {
    await page.waitForSelector("header a");
    const actual = await page.$eval("header a", link => link.getAttribute('href') );
    expect(actual).toEqual("/");
  }, 30000);

  test("The page contains Sign in button", async () => {
    const freeSelector = ".popmechanic-button";
    const firstLink = await page.$(`div a[href="/free"]`);
    await firstLink.click();
    await page.waitForSelector(freeSelector, {
      visible: true,
    });
    const actual = await page.$eval(freeSelector, link => link.textContent);
    expect(actual).toContain("Записаться");
  }, 30000);
});
