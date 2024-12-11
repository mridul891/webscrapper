// Import necessary modules

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
// Define an array of target websites and the data you want to scrape
const websites = [
  {
    url: "https://mridul891.github.io/newssite/",
    parseData: ($) => {
      // Example: Scrape titles from a list of articles
      return $("h2")
        .map((_, el) => $(el).text().trim())
        .get();
    },
  },
  {
    url: "https://www.bbc.com/",
    parseData: ($) => {
      // Example: Scrape titles from a list of articles
      return $(".sc-8ea7699c-0 h2")
        .map((_, el) => $(el).text().trim())
        .get();
    },
  },
  {
    url: "https://vijaykarnataka.com/",
    parseData: ($) => {
      // Example: Scrape titles from a list of articles
      return $(".text_ellipsis")
        .map((_, el) => $(el).text().trim())
        .get();
    },
  },
];

// Function to scrape data from a single website
async function scrapeWebsite({ url, parseData }) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const scrapedData = parseData($);
    return { url, data: scrapedData };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return { url, error: error.message };
  }
}

// Main function to scrape all websites
async function scrapeAllWebsites() {
  const aggregatedData = [];

  const results = await Promise.all(websites.map(scrapeWebsite));
  results.forEach((result) => {
    if (result.error) {
      console.log(`Failed to scrape ${result.url}: ${result.error}`);
    } else {
      console.log(`Data from ${result.url}:`, result.data);
      aggregatedData.push(...result.data);
    }
  });

  console.log("Aggregated Data:", aggregatedData);
  return aggregatedData;
}

// Run the scraper

app.get("/info" , scrapeAllWebsites)

app.get("/" , (req , res) =>{
  res.json({
    message : " Started"
  })
})
app.listen(3005, () => console.log("server stareted at point : 3005"));
