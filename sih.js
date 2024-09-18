const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express')

const app = express()
// URL of the news website to scrape

async function scrapeNews(req, res) {
    const URL = 'https://www.indiatoday.in/home';
    try {
        // Fetch the HTML of the page
        const { data } = await axios.get(URL);

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Select the elements that contain the news articles (update the selector based on the website)
        const articles = [];

        // For example, BBC news articles are in <a> tags with the class '.gs-c-promo-heading'
        $('div.B1S3_content__wrap__9mSB6').each((i, elem) => {
            const title = $(elem).text().trim();  // Get the text of the article (the title)
            // Get the href (the link)

            // Push the article title and link to the articles array
            articles.push({
                title: title,
            });
        });

        // Output the extracted articles
        res.json(articles);
    } catch (error) {
        console.error('Error scraping news:', error);
    }
}

// Call the function

app.get("/info", scrapeNews);


app.listen(3000, (req, res) => {
    console.log("localhost started")
})
