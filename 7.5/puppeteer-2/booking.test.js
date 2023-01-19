const { expect } = require("chai");
const { clickElement, getText, clickElementAndGetText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
    page.close();
});

describe("Booking tests", () => {

    test("The first happy path test'", async () => {
        const expectedFilm = await getText(page, ".movie__title");
        const expectedTime = await clickElementAndGetText(page, ".movie-seances__time-block");
        await clickElement(page, ".buying-scheme__row .buying-scheme__chair:last-child");
        await clickElement(page, ".acceptin-button");

        actualFilm = await getText(page, ".ticket__title");
        actualTime = await getText(page, ".ticket__start");

        expect(actualFilm).toContain(expectedFilm);
        expect(actualTime).toContain(expectedTime);
      });

      test("The second happy path test'", async () => {
        await clickElement(page, ".page-nav__day:nth-child(4)");
        const expectedFilm = await getText(page, ".movie:nth-child(2) .movie__title");
        const expectedTime = await clickElementAndGetText(page, ".movie:nth-child(2) .movie-seances__time-block");
        await clickElement(page, ".buying-scheme__row .buying-scheme__chair:last-child");
        await clickElement(page, ".acceptin-button");

        actualFilm = await getText(page, ".ticket__title");
        actualTime = await getText(page, ".ticket__start");

        expect(actualFilm).toContain(expectedFilm);
        expect(actualTime).toContain(expectedTime);
      });

      test.only("The sad path test'", async () => {
          await clickElement(page, ".movie-seances__time-block");
          await clickElement(page, ".buying-scheme__chair_taken");
          let button = await page.$eval(".acceptin-button", link => link.hasAttribute("disabled"));
          expect(button).contain(true);
      });

}, 6000);
