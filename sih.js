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
    const url = "https://mridul891.github.io/newssite/";

    // Fetch and scrape the website
    const cities = ["Kalpa", "Mumbai ", "Kerala", "Bhopal", "Guwahati"];
    axios
      .get(url)
      .then((response) => {
        // Load the HTML into cheerio
        const $ = cheerio.load(response.data);

        // Extract data (modify selectors based on actual HTML structure)
        const headlines = [];

        // Assuming headlines are in <h2> tags
        $("h2").each((index, element) => {
          const headline = $(element).text().replace(/\s+/g, " ").trim(); // Trim removes extra spaces and newlines
          const city = Math.floor(Math.random()*10)%cities.length
          console.log(city)
          headlines.push({
            title: headline,
            city: cities[city]
          });
        });

        // Log the extracted data
        res.json(headlines);
      })
      .catch((error) => {
        console.error("Error fetching the website:", error);
      });
  } catch (error) {
    console.error("Error scraping news:", error);
  }
}


async function scrapeTwitter(req, res) {
  try {
    const url = "https://mridul891.github.io/newssite/";

    // Fetch and scrape the website
    const cities = ["Kalpa", "Mumbai ", "Kerala", "Bhopal", "Guwahati"];
    axios
      .get(url)
      .then((response) => {
        // Load the HTML into cheerio
        const $ = cheerio.load(response.data);

        // Extract data (modify selectors based on actual HTML structure)
        const headlines = [];

        // Assuming headlines are in <h2> tags
        $("h2").each((index, element) => {
          const headline = $(element).text().replace(/\s+/g, " ").trim(); // Trim removes extra spaces and newlines
          const city = Math.floor(Math.random()*10)%cities.length
          console.log(city)
          headlines.push({
            title: headline,
            city: cities[city]
          });
        });

        // Log the extracted data
        res.json(headlines);
      })
      .catch((error) => {
        console.error("Error fetching the website:", error);
      });
  } catch (error) {
    console.error("Error scraping news:", error);
  }
}
// Call the function

app.get("/info", scrapeNews);

app.listen(3000, (req, res) => {
  console.log("localhost started");
});
