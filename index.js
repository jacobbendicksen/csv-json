"use strict";

var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var prompt = require('prompt');
prompt.start();
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: __dirname + '/uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({ storage: storage })

app.set('views', path.join(__dirname, 'views'));

var source = "";
var file;
var whichInterface = "web";

var oldColor = "";
var oldPrice = "";
var oldName = "";
var oldSize = "";
var oldVintage = "";
var oldVarietal = "";
var oldQuantity = "";
var oldRegion = "";
var oldWinery = "";
var oldDrinkBy = "";
var oldAbv = "";
var oldImg_path = "";
var oldExternal_img_path = "";
var oldRatingValue = "";
var oldRatingAuthor = "";
var oldRatingReview = "";
var oldReady = false;
var oldSpecial = false;
var oldRecentlyAdded = false;
var oldFoodPairing = "";

var missing = {};
missing["colorMissing"];
missing ["sizeMissing"];
missing["priceMissing"];
missing["quantityMissing"];
missing["vintageMissing"];
missing["nameMissing"];
missing["varietalMissing"];
missing["wineryMissing"];
missing["regionMissing"];
missing["drinkByMissing"];
missing["abvMissing"];
missing["imgMissing"];
missing["externalImgMissing"];
missing["ratingValueMissing"];
missing["ratingAuthorMissing"];
missing["ratingReviewMissing"];
missing["readyMissing"];
missing["specialMissing"];
missing["recentlyAddedMissing"];
missing["foodPairingMissing"];


converter.transform = function(json, row, index) {
    switch(source){
      case "cellartracker":
        oldColor = "Color";
        oldPrice = "Price";
        oldName = "Wine";
        oldSize = "Size";
        oldVintage = "Vintage";
        oldVarietal = "Varietal";
        oldQuantity = "Quantity";
        oldRegion = "Region";
        oldWinery = "Vineyard";
        oldDrinkBy = "EndConsume";
        break;
    }

    if (!(json[oldColor])){
      json.color = "";
      missing["colorMissing"] = true;
    }
    else{
      json.color = json[oldColor];
      missing["colorMissing"] = false;
    }
    if (!(json[oldPrice])){
      json.price = "";
      missing["priceMissing"] = true;
    }
    else{
      json.price = json[oldPrice];
      missing["priceMissing"] = false;
    }
    if (!(json[oldName])){
      json.name = "";
      missing["nameMissing"] = true;
    }
    else{
      json.name = json[oldName];
      missing["nameMissing"] = false;
    }
    if (!(json[oldSize])){
      json.size = "";
      missing["sizeMissing"] = true;
    }
    else{
      json.size = json[oldSize];
      missing["sizeMissing"] = false;
    }
    if (!(json[oldVintage])){
      json.vintage = "";
      missing["vintageMissing"] = true;
    }
    else{
      json.vintage = json[oldVintage];
      missing["vintageMissing"] = false;
    }
    if (!(json[oldVarietal])){
      json.varietal = "";
      missing["varietalMissing"] = true;
    }
    else{
      json.varietal = json[oldVarietal];
      missing["varietalMissing"] = false;
    }
    if (!(json[oldQuantity])){
      json.quantity = "";
      missing["quantityMissing"] = true;
    }
    else{
      json.bottles = json[oldQuantity];
      missing["quantityMissing"] = false;
    }
    if (!(json[oldRegion])){
      json.region = "";
      missing["regionMissing"] = true;
    }
    else{
      json.region = json[oldRegion];
      missing["regionMissing"] = false;
    }
    if (!(json[oldWinery])){
      json.winery = "";
      missing["wineryMissing"] = true;
    }
    else{
      json.winery = json[oldWinery];
      missing["wineryMissing"] = false;
    }
    if (!(json[oldDrinkBy])){
      json.drinkBy = "";
      missing["drinkByMissing"] = true;
    }
    else{
      json.drinkBy = json[oldDrinkBy];
      missing["drinkByMissing"] = false;
    }
    if (!(json[oldAbv])){
      json.abv = "";
      missing["abvMissing"] = true;
    }
    else{
      json.abv = json[oldAbv];
      missing["abvMissing"] = false;
    }
    if (!(json[oldImg_path])){
      json.img_path = "";
      missing["imgMissing"] = true;
    }
    else{
      json.img_path = json[oldImg_path];
      missing["imgMissing"] = false;
    }
    if (!(json[oldExternal_img_path])){
      json.external_img_path = "";
      missing["externalImgMissing"] = true;
    }
    else{
      json.external_img_path = json[oldExternal_img_path];
      missing["externalImgMissing"] = false;
    }
    if (!(json[oldRatingValue])){
      json.ratingValue = "";
      missing["ratingValueMissing"] = true;
    }
    else{
      json.ratingValue = json[oldRatingValue];
      missing["ratingValueMissing"] = false;
    }
    if (!(json[oldRatingAuthor])){
      json.ratingAuthor = "";
      missing["ratingAuthorMissing"] = true;
    }
    else{
      json.ratingAuthor = json[oldRatingAuthor];
      missing["ratingAuthorMissing"] = false;;
    }
    if (!(json[oldRatingReview])){
      json.ratingReview = "";
      missing["ratingReviewMissing"] = true;
    }
    else{
      json.ratingReview = json[oldRatingReview];
      missing["ratingReviewMissing"] = false;
    }
    if (!(json[oldReady])){
      json.ready = false;
      missing["readyMissing"] = true;
    }
    else{
      if (json[oldReady] == true || json[oldReady] == "true" || json[oldReady] == "t"){
        json.ready = true;
      }
      else {
        json.ready = false;
      }
      missing["readyMissing"] = false;
    }
    if (!(json[oldSpecial])){
      json.special = false;
      missing["specialMissing"] = true;
    }
    else {
      if (json[oldSpecial] == true || json[oldSpecial] == "true" || json[oldSpecial] == "t"){
        json.special = true;
      }
      else {
        json.special = false;
      }
      missing["specialMissing"] = false;
    }
    if (!(json[oldRecentlyAdded])){
      json.recentlyAdded = false;
      missing["recentlyAddedMissing"] = true;
    }
    else{
      if (json[oldRecentlyAdded] == true || json[oldRecentlyAdded] == "true" || json[oldRecentlyAdded] == "t"){
        json.recentlyAdded = true;
      }
      else {
        json.recentlyAdded = false;
      }
      missing["recentlyAddedMissing"] = false;
    }
    if (!(json[oldFoodPairing])){
      json.foodPairing = "";
      missing["foodPairingMissing"] = true;
    }
    else{
      json.foodPairing = json[oldFoodPairing];
      missing["foodPairingMissing"] = false;
    }

    delete json[oldColor];
    delete json[oldPrice];
    delete json[oldName];
    delete json[oldSize];
    delete json[oldVintage];
    delete json[oldVarietal];
    delete json[oldQuantity];
    delete json[oldRegion];
    delete json[oldWinery];
    delete json[oldDrinkBy];
    delete json[oldAbv];
    delete json[oldImg_path];
    delete json[oldExternal_img_path];
    delete json[oldRatingValue];
    delete json[oldRatingAuthor];
    delete json[oldRatingReview];
    delete json[oldReady];
    delete json[oldSpecial];
    delete json[oldRecentlyAdded];
    delete json[oldFoodPairing];
    delete json.WS;
    delete json.WSWeb;
};

switch (whichInterface) {
    case "cli":
        prompt.get(['filename', 'source'], function(err, result) {
            source = result.source;
            file = result.filename;

            if (source != "cellartracker"){
              prompt.get(['color','price','name','size','vintage','varietal','quantity','region','winery','drink by','abv','image path','external image path','rating value','rating author','rating review','ready','special','recently added','food pairing','readytoconvert'], function(err,result){
                oldColor = result.color;
                oldPrice = result.price;
                oldName = result.name;
                oldSize = result.size;
                oldVintage = result.vintage;
                oldVarietal = result.varietal;
                oldQuantity = result.quantity;
                oldRegion = result.region;
                oldWinery = result.winery;
                oldDrinkBy = result['drink by'];
                oldAbv = result.abv;
                oldImg_path = result['image path'];
                oldExternal_img_path = result['external image path'];
                oldRatingValue = result['rating value'];
                oldRatingAuthor = result['rating author'];
                oldRatingReview = result['rating review'];
                if (result.ready == "true" || result.ready == "t" || result.ready == "y" || result.ready == "yes"){
                  oldReady = true;
                }
                if (result.special == "true" || result.special == "t" || result.special == "y" || result.special == "yes"){
                  oldSpecial = true;
                }
                if (result['recently added'] == "true" || result['recently added']  == "t" || result['recently added']  == "y" || result['recently added']  == "yes"){
                  oldRecentlyAdded = true;
                }
                oldFoodPairing = result['food pairing'];
                if (result.readytoconvert == "yes"){
                  fs.createReadStream(file).pipe(converter);
                }
              })
            }
            else {
              fs.createReadStream(file).pipe(converter);
            }
            converter.on("end_parsed", function(jsonArray) {
                console.log(jsonArray);
            });
        });
        break;
    case "web":
        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname + '/index.html'));
						console.log("\nloaded index.html\n");
        });
        //source = "cellartracker";
        app.post('/upload', upload.single('file'), function(req, res, next) {
						console.log("\nFile uploaded.");
						file = req.file.path;
						console.log("\nPath:\n" + file);
            if (req.body.color != ""){
              oldColor = req.body.color;
              //console.log("color mapped");
            }
            if (req.body.price != ""){
              oldPrice = req.body.price;
              //console.log("price mapped");
            }
            if (req.body.name != ""){
              oldName = req.body.name;
              // console.log("name mapped");
            }
            if (req.body.size != ""){
              oldSize = req.body.size;
              // console.log("size mapped");
            }
            if (req.body.vintage != ""){
              oldVintage = req.body.vintage;
              // console.log("vintage mapped");
            }
            if (req.body.varietal != ""){
              oldVarietal = req.body.varietal;
              // console.log("varietal mapped");
            }
            if (req.body.quantity != ""){
              oldQuantity = req.body.quantity;
              // console.log("quantity mapped");
            }
            if (req.body.region != ""){
              oldRegion = req.body.region;
              // console.log("region mapped");
            }
            if (req.body.winery != ""){
              oldWinery = req.body.winery;
              // console.log("winery mapped");
            }
            if (req.body.drinkBy != ""){
              oldDrinkBy = req.body.drinkBy;
              // console.log("drink by mapped");
            }
            if (req.body.abv != ""){
              oldAbv = req.body.abv;
              // console.log("abv mapped");
            }
            if (req.body.img_path != ""){
              oldImg_path = req.body.img_path;
              // console.log("image path mapped");
            }
            if (req.body.external_img_path != ""){
              oldExternal_img_path = req.body.external_img_path;
              // console.log("external image path mapped");
            }
            if (req.body.ratingValue != ""){
              oldRatingValue = req.body.ratingValue;
              // console.log("rating value mapped");
            }
            if (req.body.ratingAuthor != ""){
              oldRatingAuthor = req.body.ratingAuthor;
              // console.log("rating author mapped");
            }
            if (req.body.ratingReview != ""){
              oldRatingReview = req.body.ratingReview;
              // console.log("rating review mapped");
            }
            if (req.body.ready != ""){
              oldReady = req.body.ready;
              // console.log("ready mapped");
            }
            if (req.body.special != ""){
              oldSpecial = req.body.special;
              // console.log("special mapped");
            }
            if (req.body.recentlyAdded != ""){
              oldRecentlyAdded = req.body.recentlyAdded;
              // console.log("recently added mapped");
            }
            if (req.body.foodPairing != ""){
              oldFoodPairing = req.body.foodPairing;
              // console.log("food pairing mapped");
            }

						converter.on("end_parsed", function(jsonArray) {
								fs.writeFile("files/download",JSON.stringify(jsonArray,null,"\t"), function(err){
									if(err) {
										console.log(err);
									};
                  console.log("\nMissing elements:\n(true means that the element didn't map correctly - it didn't exist in the CSV or the wrong CSV header was provided)\n");
                  for (var key in missing){
                    console.log(key + ": " + missing[key]);
                  }
								});

								//console.log("\nJSON contents:\n" + JSON.stringify(jsonArray));
						});

						fs.createReadStream(file).pipe(converter);
						res.status(204).end();
        });
				app.post('/download', function(req,res){
					console.log("\nDownload requested.");
					res.download(__dirname + '/files/download', 'wineJSON.json');
					console.log("\nDownload completed.")
				});
        app.listen(process.env.PORT || 5000);
        break;
}
