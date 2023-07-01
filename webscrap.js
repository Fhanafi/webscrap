const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Web Scraping Tool')
  .requiredOption('-u, --url <url>', 'URL to scrape')
  .requiredOption('-o, --output <output>', 'Output file path')
  .parse(process.argv);

const url = program.url;
const outputFilePath = program.output;

const scrapeWebsite = async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const pageTitle = $('title').text();
    console.log('Judul Halaman:', pageTitle);
    const links = [];
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      links.push(link);
    });
    console.log('Tautan:', links);

    // Menyimpan hasil scraping ke file
    const outputData = `Judul Halaman: ${pageTitle}\nTautan: ${links.join('\n')}`;
    fs.writeFileSync(outputFilePath, outputData);
    console.log(`Data berhasil disimpan dalam file: ${outputFilePath}`);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

scrapeWebsite();
