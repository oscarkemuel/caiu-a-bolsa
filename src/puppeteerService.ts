import puppeteer from "puppeteer";

class PupperteerService {
  private sigFundacaoUrl = process.env.SIGFUNDACAO_URL;

  private physicalPersonXpath = 'html/body/div[2]/section/div/div[2]/fieldset/div/form/div[1]/div[3]/div[2]/a';
  private physicalPersonInputXpath = 'html/body/div[2]/section/div/div[2]/fieldset/div/form/div/div[2]/div/div/input';
  private filterButtonXpath = 'html/body/div[2]/section/div/div[2]/fieldset/div/form/div/div[3]/div[1]/a';
  private detailsButtonXpath = 'html/body/div[2]/section/div/div[2]/fieldset/div/form/div[3]/table/tbody/tr/td[1]/div/a';
  private paymentsNumberXpath = 'html/body/div[2]/section/div/div[2]/fieldset/div/form/div[3]/div[1]/h6/span';

  async getPaymentsNumberByName(name = '') {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(this.sigFundacaoUrl || '');
    const physicalPersonElement = await page.waitForSelector(`xpath/${this.physicalPersonXpath}`);
    if (!physicalPersonElement) {
      return;
    }
    await physicalPersonElement.click();
    await page.waitForNavigation({waitUntil: 'networkidle2'});

    const physicalPersonInput = await page.waitForSelector(`xpath/${this.physicalPersonInputXpath}`);
    if (!physicalPersonInput) {
      return;
    }
    await physicalPersonInput.type(name);

    const filterButton = await page.waitForSelector(`xpath/${this.filterButtonXpath}`);
    if (!filterButton) {
      return;
    }

    await filterButton.click();
    await page.waitForNavigation({waitUntil: 'networkidle2'});

    const detailsButton = await page.waitForSelector(`xpath/${this.detailsButtonXpath}`);
    if (!detailsButton) {
      return;
    }


    await detailsButton.click();
    await page.waitForNavigation({waitUntil: 'networkidle2'});

    const paymentsNumberSpan = await page.waitForSelector(`xpath/${this.paymentsNumberXpath}`);
    if (!paymentsNumberSpan) {
      return;
    }

    const paymentsNumberText = await paymentsNumberSpan.evaluate((node) => node.textContent);
    await browser.close();

    return paymentsNumberText;
  }
}

export default new PupperteerService();