const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.getAsahi = async function () {
  //毎日新聞
  const info = await fetch("https://www.asahi.com/");
  const HTML = await info.text();
  const res = cheerio.load(HTML);
  res(".Time").remove();

  //記事の配列を作る
  let titles = [];
  let list = res(`.ListHeadline`);
  list.children().each((i, elem) => {
    const n = list.find(elem);
    const text = n.text().trim();
    titles.push(text);
  });

  //newsAsahiInfoのオブジェクトを作る
  newAsahi = [];
  for (let i = 0; i < 3; i++) {
    newAsahi[i] = {
      rank: titles[i],
    };
  }
  return newAsahi
}

