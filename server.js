
//!V1---------------------------------------
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const base = "https://gamerant.com";
// const cors = require('cors');
// const resources = { name: 'gamerant', address: 'https://gamerant.com/', base: 'https://gamerant.com/' };
// let newsData = []; // Initialize an empty array to store news data

// // Function to check if a news item is older than 6 hours
// function isOlderThan6Hours(time) {
//   const sixHoursAgo = new Date();
//   sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
//   return new Date(time) < sixHoursAgo;
// }

// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }));

// app.get('/fetch', async (req, res) => {
//   try {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(newsData); // Return the newsData array as the response
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching the latest news data.' });
//   }
// });

// app.get('/news', async (req, res) => {
//   axios
//     .get(resources.address)
//     .then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html);

//       // Clear the newsData array before populating it with new data
//       const newNewsData = [];

//       $('div.sentinel-home-list div.display-card.article.small').each((index, element) => {
//         const $element = $(element);
//         const title = $element.find('h5.display-card-title a').text().trim();
//         const titleLink = resources.base + $element.find('h5.display-card-title a').attr('href').trim();
//         const description = $element.find('p.display-card-excerpt').text().trim();
//         const datetime = $element.find('time.display-card-date').attr('datetime'); // Get the datetime attribute

//         // Check if the news item is older than 6 hours
//         if (!isOlderThan6Hours(datetime)) {
//           const imageSources = [];
//           $element.find('div.bc-img.responsive-img.img-displayCard > figure > picture > source:first-of-type').each((imgIndex, imgElement) => {
//             const imgSource = $(imgElement).attr('srcset');
//             if (imgSource) {
//               // Extract the URL from srcset attribute
//               const [url, size] = imgSource.split(' ').filter((value) => value.trim() !== '');
//               imageSources.push(url);
//             }
//           });

//           const brandTags = [];
//           $element.find('a.tag-label-text.primary-tag.brand-tag').each((tagIndex, tagElement) => {
//             const brandTag = $(tagElement).text().trim();
//             brandTags.push(brandTag);
//           });

//           // Convert the datetime to a numeric timestamp (Unix timestamp)
//           const timestamp = new Date(datetime).getTime();

//           const newsItem = {
//             title,
//             titleLink,
//             description,
//             timestamp, // Use the numeric timestamp
//             imageSources,
//             brandTags,
//           };

//           newNewsData.push(newsItem); // Append to the end of the newNewsData array
//         }
//       });

//       // Sort the newNewsData array based on time (latest to oldest)
//       newNewsData.sort((a, b) => b.timestamp - a.timestamp);

//       // Replace newsData with the newly fetched and filtered data
//       newsData = newNewsData;

//       console.log('Latest news data updated in newsData');
//       res.json({ message: 'Latest news data updated successfully.', data: newsData });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: 'Error fetching data from the website.' });
//     });
// });

// app.listen(PORT, () => {
//   console.log(`Server started at ${PORT}`);
// });
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const PORT = process.env.PORT || 5000;
// const app = express();
// const base = "https://gamerant.com";
// const cors = require('cors');
// const resources = { name: 'gamerant', address: 'https://gamerant.com/', base: 'https://gamerant.com/' };
// let newsData = []; // Initialize an empty array to store news data

// // Function to check if a news item is older than 6 hours
// function isOlderThan6Hours(time) {
//   const sixHoursAgo = new Date();
//   sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
//   return new Date(time) < sixHoursAgo;
// }

// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }));

// app.get('/fetch', async (req, res) => {
//   try {
//     // Fetch the latest news data by calling the /news endpoint
//     const latestNewsData = await fetchLatestNewsData();
    
//     // Send the latest news data as the response
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(latestNewsData);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching the latest news data.' });
//   }
// });

// // Function to fetch and update the latest news data
// async function fetchLatestNewsData() {
//   try {
//     const response = await axios.get(resources.address);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Clear the newsData array before populating it with new data
//     const newNewsData = [];

//     $('div.sentinel-home-list div.display-card.article.small').each((index, element) => {
//       const $element = $(element);
//       const title = $element.find('h5.display-card-title a').text().trim();
//       const titleLink = resources.base + $element.find('h5.display-card-title a').attr('href').trim();
//       const description = $element.find('p.display-card-excerpt').text().trim();
//       const datetime = $element.find('time.display-card-date').attr('datetime'); // Get the datetime attribute

//       // Check if the news item is older than 6 hours
//       if (!isOlderThan6Hours(datetime)) {
//         const imageSources = [];
//         $element.find('div.bc-img.responsive-img.img-displayCard > figure > picture > source:first-of-type').each((imgIndex, imgElement) => {
//           const imgSource = $(imgElement).attr('srcset');
//           if (imgSource) {
//             // Extract the URL from srcset attribute
//             const [url, size] = imgSource.split(' ').filter((value) => value.trim() !== '');
//             imageSources.push(url);
//           }
//         });

//         const brandTags = [];
//         $element.find('a.tag-label-text.primary-tag.brand-tag').each((tagIndex, tagElement) => {
//           const brandTag = $(tagElement).text().trim();
//           brandTags.push(brandTag);
//         });

//         // Convert the datetime to a numeric timestamp (Unix timestamp)
//         const timestamp = new Date(datetime).getTime();

//         const newsItem = {
//           title,
//           titleLink,
//           description,
//           timestamp, // Use the numeric timestamp
//           imageSources,
//           brandTags,
//         };

//         newNewsData.push(newsItem); // Append to the end of the newNewsData array
//       }
//     });

//     // Sort the newNewsData array based on time (latest to oldest)
//     newNewsData.sort((a, b) => b.timestamp - a.timestamp);

//     // Replace newsData with the newly fetched and filtered data
//     newsData = newNewsData;

//     console.log('Latest news data updated in newsData');
//      res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(newsData); 
//     // return { newsData };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// app.listen(PORT, () => {
//   console.log(`Server started at ${PORT}`);
// });

//v3--------------------------------
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 5000;
const app = express();
const base = "https://gamerant.com";
const cors = require('cors');
const resources = { name: 'gamerant', address: 'https://gamerant.com/', base: 'https://gamerant.com/' };
let newsData = []; // Initialize an empty array to store news data

// Function to check if a news item is older than 6 hours
function isOlderThan6Hours(time) {
  const sixHoursAgo = new Date();
  sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
  return new Date(time) < sixHoursAgo;
}

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// app.get('/fetch', async (req, res) => {
//   try {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(newsData); // Return the newsData array as the response
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching the latest news data.' });
//   }
// });

app.get('/fetch', async (req, res) => {
  axios
    .get(resources.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      // Clear the newsData array before populating it with new data
      const newNewsData = [];

      $('div.sentinel-home-list div.display-card.article.small').each((index, element) => {
        const $element = $(element);
        const title = $element.find('h5.display-card-title a').text().trim();
        const titleLink = resources.base + $element.find('h5.display-card-title a').attr('href').trim();
        const description = $element.find('p.display-card-excerpt').text().trim();
        const datetime = $element.find('time.display-card-date').attr('datetime'); // Get the datetime attribute

        // Check if the news item is older than 6 hours
        if (!isOlderThan6Hours(datetime)) {
          const imageSources = [];
          $element.find('div.bc-img.responsive-img.img-displayCard > figure > picture > source:first-of-type').each((imgIndex, imgElement) => {
            const imgSource = $(imgElement).attr('srcset');
            if (imgSource) {
              // Extract the URL from srcset attribute
              const [url, size] = imgSource.split(' ').filter((value) => value.trim() !== '');
              imageSources.push(url);
            }
          });

          const brandTags = [];
          $element.find('a.tag-label-text.primary-tag.brand-tag').each((tagIndex, tagElement) => {
            const brandTag = $(tagElement).text().trim();
            brandTags.push(brandTag);
          });

          // Convert the datetime to a numeric timestamp (Unix timestamp)
          const timestamp = new Date(datetime).getTime();

          const newsItem = {
            title,
            titleLink,
            description,
            timestamp, // Use the numeric timestamp
            imageSources,
            brandTags,
          };

          newNewsData.push(newsItem); // Append to the end of the newNewsData array
        }
      });

      // Sort the newNewsData array based on time (latest to oldest)
      newNewsData.sort((a, b) => b.timestamp - a.timestamp);

      // Replace newsData with the newly fetched and filtered data
      newsData = newNewsData;

      console.log('Latest news data updated in newsData');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(newsData); 
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from the website.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
