const { Builder, By, until } = require("selenium-webdriver");

describe("Functional Testing with Selenium WebDriver", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("Тестируем результат открытия страницы, что заголовок сайта равен указанной строке", async () => {
    await driver.get("https://www.wildberries.ru");
    await driver.wait(
      until.titleIs(
        "Интернет-магазин Wildberries: широкий ассортимент товаров - скидки каждый день!"
      ),
      10000
    );
    const title = await driver.getTitle();
    expect(title).toMatch(
      "Интернет-магазин Wildberries: широкий ассортимент товаров - скидки каждый день!"
    );
  }, 15000);

  it("Проверка видимости объектов", async () => {
    await driver.get("https://www.wildberries.ru/");

    const element = await driver.findElement(
      By.xpath("/html/body/div[1]/header")
    );
    await driver.wait(until.elementIsVisible(element), 10000);
    const isDisplayed = await element.isDisplayed();
    expect(isDisplayed).toBe(true);
  });

  it("Переход по ссылке", async () => {
    await driver.get("https://www.wildberries.ru/");
    const link = await driver.findElement(
      By.xpath("/html/body/div[2]/a[2]/span")
    );
    await link.click();
    await driver.wait(
      until.urlContains("https://www.wildberries.ru/lk/basket"),
      10000
    );
    const url = await driver.getCurrentUrl();
    expect(url).toContain("https://www.wildberries.ru/lk/basket");
  });

  it("Эмуляция нажатия на кнопку", async () => {
    await driver.get("https://www.wildberries.ru/");
    const button = await driver.findElement(By.xpath("/html/body/div[2]/a[3]"));
    await button.click();

    const result = await driver.findElement(
      By.xpath("/html/body/div[1]/div/div")
    );
    await driver.wait(until.elementIsVisible(result), 10000);
    const isDisplayed = await result.isDisplayed();
    expect(isDisplayed).toBe(true);
  });

  it("Заполнение текстового поля", async () => {
    await driver.get("https://www.wildberries.ru/");

    const input = await driver.wait(
      until.elementLocated(
        By.xpath("/html/body/div[1]/header/div/div[2]/div[2]/div[1]/input")
      ),
      20000
    );

    await input.sendKeys("тест");

    await driver.wait(async function () {
      const value = await input.getAttribute("value");
      return value === "тест";
    }, 20000);

    // Проверяем значение
    const value = await input.getAttribute("value");
    expect(value).toBe("тест");
  }, 20000);
});
