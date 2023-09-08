const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const app = express();
const base = "https://gamerant.com";

const resources = { name: 'gamerant', address: 'https://gamerant.com/', base: 'https://gamerant.com/' };

app.get('/fetch', (req, res) => {
  try {
    const latestNewsData = fs.readFileSync('latest-news.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(latestNewsData);
  } catch (err) {
    res.status(500).json({ error: 'Error reading the latest news data.' });
  }
});

app.get('/news', (req, res) => {
  axios
    .get(resources.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const newsData = [];

      $('div.sentinel-home-list div.display-card.article.small').each((index, element) => {
        const $element = $(element);
        const title = $element.find('h5.display-card-title a').text().trim();
        const titleLink = resources.base + $element.find('h5.display-card-title a').attr('href').trim();
        const description = $element.find('p.display-card-excerpt').text().trim();
        const time = $element.find('time.display-card-date').text().trim();

        const imageSources = [];
        // Extract image sources from the <picture> tag
        $element.find('picture source').each((imgIndex, imgElement) => {
          const imgSource = $(imgElement).attr('srcset');
          if (imgSource) {
            // Extract the URL from srcset attribute
            const imgURL = imgSource.split(' ')[0];
            imageSources.push(imgURL);
          }
        });

        const brandTags = [];
        $element.find('a.tag-label-text.primary-tag.brand-tag').each((tagIndex, tagElement) => {
          const brandTag = $(tagElement).text().trim();
          brandTags.push(brandTag);
        });

        const newsItem = {
          title,
          titleLink,
          description,
          time,
          imageSources,
          brandTags,
        };

        // Check for duplicate data before appending
        if (!newsData.some((item) => item.title === newsItem.title)) {
          newsData.unshift(newsItem); // Append to the front/top of the array
        }
      });

      // Read the existing data from the file, if any
      let existingNewsData = [];
      try {
        existingNewsData = JSON.parse(fs.readFileSync('latest-news.json', 'utf8'));
      } catch (err) {
        // File doesn't exist or is empty
      }

      // Combine the new data with the existing data and remove duplicates
      const updatedNewsData = [...newsData, ...existingNewsData.filter((item) =>
        !newsData.some((newItem) => newItem.title === item.title)
      )];

      // Write the updated data back to the file
      fs.writeFileSync('latest-news.json', JSON.stringify(updatedNewsData, null, 2));

      console.log('Latest news data updated in latest-news.json');
      res.json({ message: 'Latest news data updated successfully.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from the website.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
