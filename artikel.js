const express = require("express");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const { executablePath } = require("puppeteer");

const app = express();
app.use(express.json());


(async () => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        executablePath:executablePath(),
        userDataDir: "./user_data",
        args: [
          "--no-sandbox",
          "--disable-gpu",
          "--enable-webgl",
          "--window-size=800,800",
          "--disable-notifications"
        ],
      });
     
        const page = await browser.newPage();
        await page.goto("https://ciciptools.blogspot.com/p/instant-demo.html?&id=&host=www.dominasigoogle.biz.id");
        // console.log('input' + input);
        await page.click('#muali1');
        await page.click('#oklogin');
        
        // const page2 = await browser.newPage();
        // await page2.goto("https://www.dominasigoogle.biz.id/p/login.html");
      
        // click button
        // await page2.click("#google-sign-in");
        // await page2.waitForNavigation();
  
        // await page2.waitForSelector('[type="email"]');
        // await page2.type('[type="email"]', "email@gmail.com");
        // await page2.click("#identifierNext");

        // await page2.waitForSelector('[type="password"]', { visible: true });
        // await page2.type('[type="password"]', "password_email");
  
        // await page2.click("#passwordNext");
        // await page2.waitForNavigation();

        // await page2.waitForSelector('[type="submit"]');
        // await page2.click('[type="submit"]');

        await page.goto("https://www.dominasigoogle.biz.id/p/instant-artikel-generator-ai.html");
        // gett all iframe

        const iframes = await page.$$('iframe')
        let iframeHandle = iframes[0];
        const frame = await iframeHandle.contentFrame();

        const data = await frame.$eval('#muali', input => input.click());

        await page.waitForTimeout(10000);

        const innerHTML = await page.evaluate(() => {
            const element = document.getElementById('hasildata');
            let dataHTML = element.children[2].children[1].children[0].children[0].children[0].children[1].children[0].innerHTML
            return dataHTML
        });
    } catch (error) {
      console.error("Error:", error);
    }
  })();
  
app.listen(3000, () => {
  console.log("Server started on port 3000");
});