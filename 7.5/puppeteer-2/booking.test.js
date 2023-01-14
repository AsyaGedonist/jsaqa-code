const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
    page.close();
});

describe("Booking tests", () => {

    test("The first happy-path test'", async () => {
        const expectedFilm = await getText(page, "body > main > section:nth-child(1) > div.movie__info > div.movie__description > h2");
        const expectedTime = await getText(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a");
        await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a");
        await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(10)");
        await clickElement(page, "body > main > section > button");

        actualFilm = await getText(page, "body > main > section > div > p:nth-child(1) > span");
        actualTime = await getText(page, "body > main > section > div > p:nth-child(5) > span");

        // await expect(page).toHaveURL(/.*payment.php/); 
        expect(actualFilm).toContain(expectedFilm);
        expect(actualTime).toContain(expectedTime);
      });

      test("The second happy-path test'", async () => {

      })

}, 6000);
