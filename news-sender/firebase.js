const fs = require("fs");
//newJSONのファイルの読み込み
let asahi = require("../newsJSON/asahi.json");
let mainichi = require("../newsJSON/mainichi.json");
let yomiuri = require("../newsJSON/yomiuri.json");

//firebase読み込みwithJSONで
const admin = require("firebase-admin");
var serviceAccount = require("./topnews-c7f61-firebase-adminsdk-xp7nq-baf7a7591b.json");

//データベースの初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
var db = admin.firestore();

//コレクション➙ドキュメント➙フィールドの指定
var docRef = db.collection("users").doc("topnews");
//ドキュメント削除
// let deleteDoc = db.collection("users").doc("alovelace").delete();

//フィールドに値の追加
var setAda = docRef.set({
  asahi,
  mainichi,
  yomiuri,
});
