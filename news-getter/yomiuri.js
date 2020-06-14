const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.getYomiuri = async function () {
  const info = await fetch("https://www.yomiuri.co.jp/");
  const HTML = await info.text();
  const res = cheerio.load(HTML);

  let newsMainichi = [];
  const topTitle = await res("h3.c-list-title--large").text();
  const top = topTitle.trim();

  //top以下作成
  let titles = [];
  let list = await res(".c-list-title--small");
  list.children().each((i, elem) => {
    const n = list.find(elem);
    const text = n.text().trim();
    titles.push(text);
  });

  newYomiuri = [];
  newYomiuri.unshift(top);
  for (let i = 0; i < 3; i++) {
    newYomiuri[i] = {
      rank: titles[i],
    };
  }
  return newYomiuri
};


