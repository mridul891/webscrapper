const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const app = express();

app.use(cors());
// URL of the news website to scrape

async function scrapeNews(req, res) {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the React website
    const url = "https://fplanding.vercel.app/news";
    await page.goto(url, { waitUntil: "networkidle2" }); // Wait until network is idle

    // Wait for a specific element to load
    await page.waitForSelector(".B1S3_content__wrap__9mSB6"); // Replace with the actual element class or ID

    // Extract content
    const content = await page.evaluate(() => {
      // Modify this based on the data you need
      const elements = Array.from(
        document.querySelectorAll(".B1S3_content__wrap__9mSB6")
      ); // Replace with your selector

      return elements.map((el) => {
        return {
          title: el.textContent.trim(),
        };
      });
    });

    await browser.close();
    return res.json({ data: content });
    // Close the browser
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function

app.get("/info", scrapeNews);

app.listen(3000, (req, res) => {
  console.log("localhost started");
});
