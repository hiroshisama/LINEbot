const fetch = require("node-fetch");
const cheerio = require("cheerio");


exports.getMainichi = async function () {
  const info = await fetch("https://mainichi.jp/");
  const HTML = await info.text();
  const res = cheerio.load(HTML);
  let titles = [];
  let newsMainichi = [];
  for (let i = 0; i < 3; i++) {
    titles.push(res(`#headlineList0${i + 1}`).text());
    newsMainichi[i] = {
      rank: titles[i],
    };
  }
  return newsMainichi
}






