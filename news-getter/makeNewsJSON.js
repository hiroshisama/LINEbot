const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs").promises;

//3社の新聞の読み込み
var asahi = require("./asahi.js");
var mainichi = require("./mainichi.js");
var yomiuri = require("./yomiuri.js");

//分割したファイルからデータ取得
async function getNews() {
  let newsAll = [];
  newsAll.push(await asahi.getAsahi());
  newsAll.push(await mainichi.getMainichi());
  newsAll.push(await yomiuri.getYomiuri());
  const paths = ["asahi.json", "mainichi.json", "yomiuri.json"];
  let i = 0;
  paths.forEach((path) => {
    writeFile(path, newsAll[i++]);
  });
}
getNews();

//json書き込み
async function writeFile(path, data) {
  try {
    const jsonStr = JSON.stringify(data);
    await fs.writeFile(`../newsJSON/${path}`, jsonStr);
  } catch (e) {
    console.error(e);
  }
}
