let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => { 
  
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("Another page tests", () => { 

  test("The first h1 test'", async () => {
    await page.goto("https://github.com");
    const firstLink = await page.$("a.home-campaign-enterprise");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Choose an Enterprise plan · GitHub');
  }, 8000);

  test("The second h1 test'", async () => {
    await page.goto("https://github.com/signup?user_email=&source=form-home-signup");
    const firstLink = await page.$("a.color-fg-on-emphasis:nth-child(2)");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Sign in to GitHub · GitHub');
  }, 10000);

  test("The third h1 test'", async () => {
    await page.goto("https://github.com/features/actions");
    const firstLink = await page.$("main div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.$eval("main h1", link => link.textContent);
    expect(title2).toEqual('The tools you need to build what you want.');
  }, 9000);
});
