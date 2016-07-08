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

var color = "";
var price = "";
var name = "";
var size = "";
var vintage = "";
var varietal = "";
var quantity = "";
var region = "";
var winery = "";
var drinkBy = "";
var abv = "";
var img_path = "";
var external_img_path = "";
var ratingValue = "";
var ratingAuthor = "";
var ratingReview = "";
var ready = false;
var special = false;
var recentlyAdded = false;
var foodPairing = "";

converter.transform = function(json, row, index) {
    switch(source){
      case "cellartracker":
        color = "Color";
        price = "Price";
        name = "Wine";
        size = "Size";
        vintage = "Vintage";
        varietal = "Varietal";
        quantity = "Quantity";
        region = "Region";
        winery = "Vineyard";
        drinkBy = "EndConsume";
        break;
    }

    json.color = json[color];
    json.price = json[price];
    json.name = json[name];
    json.size = json[size];
    json.vintage = json[vintage];
    json.varietal = json[varietal];
    json.bottles = json[quantity];
    json.region = json[region];
    json.winery = json[winery];
    json.drinkBy = json[drinkBy];
    json.abv = json[abv];
    json.img_path = json[img_path];
    json.external_img_path = json[external_img_path];
    json.ratingValue = json[ratingValue];
    json.ratingAuthor = json[ratingAuthor];
    json.ratingReview = json[ratingReview];
    json.ready = json[ready];
    json.special = json[special];
    json.recentlyAdded = json[recentlyAdded];
    json.foodPairing = json[foodPairing];

    delete json[color];
    delete json[price];
    delete json[name];
    delete json[size];
    delete json[vintage];
    delete json[varietal];
    delete json[quantity];
    delete json[region];
    delete json[winery];
    delete json[drinkBy];
    delete json[abv];
    delete json[img_path];
    delete json[external_img_path];
    delete json[ratingValue];
    delete json[ratingAuthor];
    delete json[ratingReview];
    delete json[ready];
    delete json[special];
    delete json[recentlyAdded];
    delete json[foodPairing];
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
                color = result.color;
                price = result.price;
                name = result.name;
                size = result.size;
                vintage = result.vintage;
                varietal = result.varietal;
                quantity = result.quantity;
                region = result.region;
                winery = result.winery;
                drinkBy = result['drink by'];
                abv = result.abv;
                img_path = result['image path'];
                external_img_path = result['external image path'];
                ratingValue = result['rating value'];
                ratingAuthor = result['rating author'];
                ratingReview = result['rating review'];
                if (result.ready == "true" || result.ready == "t" || result.ready == "y" || result.ready == "yes"){
                  ready = true;
                }
                if (result.special == "true" || result.special == "t" || result.special == "y" || result.special == "yes"){
                  special = true;
                }
                if (result['recently added'] == "true" || result['recently added']  == "t" || result['recently added']  == "y" || result['recently added']  == "yes"){
                  recentlyAdded = true;
                }
                foodPairing = result['food pairing'];
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
              color = req.body.color;
            }
            if (req.body.price != ""){
              price = req.body.price;
            }
            if (req.body.name != ""){
              name = req.body.name;
            }
            if (req.body.size != ""){
              size = req.body.size;
            }
            if (req.body.vintage != ""){
              vintage = req.body.vintage;
            }
            if (req.body.varietal != ""){
              varietal = req.body.varietal;
            }
            if (req.body.quantity != ""){
              quantity = req.body.quantity;
            }
            if (req.body.region != ""){
              region = req.body.region;
            }
            if (req.body.winery != ""){
              winery = req.body.winery;
            }
            if (req.body.drinkBy != ""){
              drinkBy = req.body.drinkBy;
            }
            if (req.body.abv != ""){
              abv = req.body.abv;
            }
            if (req.body.img_path != ""){
              img_path = req.body.img_path;
            }
            if (req.body.external_img_path != ""){
              external_img_path = req.body.external_img_path;
            }
            if (req.body.ratingValue != ""){
              ratingValue = req.body.ratingValue;
            }
            if (req.body.ratingAuthor != ""){
              ratingAuthor = req.body.ratingAuthor;
            }
            if (req.body.ratingReview != ""){
              ratingReview = req.body.ratingReview;
            }
            if (req.body.ready != ""){
              ready = req.body.ready;
            }
            if (req.body.special != ""){
              special = req.body.special;
            }
            if (req.body.recentlyAdded != ""){
              recentlyAdded = req.body.recentlyAdded;
            }
            if (req.body.foodPairing != ""){
              foodPairing = req.body.foodPairing;
            }

						converter.on("end_parsed", function(jsonArray) {
								fs.writeFile("files/download",JSON.stringify(jsonArray), function(err){
									if(err) {
										console.log(err);
									};
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
