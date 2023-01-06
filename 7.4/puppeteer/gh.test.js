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
    const firstLink = await page.$("body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.application-main > main > div:nth-child(1) > div.px-3.home-campaign-hero > div > div > div.col-11.text-left.pt-12.mt-12.pl-2.pl-sm-0 > div.d-flex.flex-column.flex-md-row > a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Choose an Enterprise plan · GitHub');
  }, 8000);

  test("The second h1 test'", async () => {
    await page.goto("https://github.com/signup?user_email=&source=form-home-signup");
    const firstLink = await page.$("body > div.logged-out.env-production.page-responsive.height-full.d-flex.flex-column.header-overlay > div.position-relative.js-header-wrapper > header > div > div > div > a");
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
