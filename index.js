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

converter.transform = function(json, row, index) {
    switch (source) {
        case "cellartracker":
            json.color = json.Color;
            json.price = json.Price;
            json.name = json.Wine;
            json.size = json.Size;
            json.vintage = json.Vintage;
            json.varietal = json.Varietal;
            json.bottles = json.Quantity;
            json.region = json.Region;
            json.winery = json.Vineyard;
            json.drinkBy = json.EndConsume;

            json.abv = "";
            json.img_path = "";
            json.external_img_path = "";
            json.ratingValue = "";
            json.ratingAuthor = "";
            json.ratingReview = "";
            json.ready = false;
            json.special = false;
            json.recentlyAdded = false;
            json.foodPairing = "";

            delete json.WS;
            delete json.WSWeb;
            delete json.Color;
            delete json.Price;
            delete json.Wine;
            delete json.Size;
            delete json.Vintage;
            delete json.Varietal;
            delete json.Quantity;
            delete json.Region;
            delete json.Vineyard;
            delete json.EndConsume;
            break;
    }
};

switch (whichInterface) {
    case "cli":
        prompt.get(['filename', 'source'], function(err, result) {
            source = result.source;
            file = result.filename;

            converter.on("end_parsed", function(jsonArray) {
                console.log(jsonArray);
            });
            fs.createReadStream(file).pipe(converter);
        });
        break;
    case "web":
        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname + '/index.html'));
						console.log("\nloaded index.html\n");
        });
        source = "cellartracker";
        app.post('/upload', upload.single('file'), function(req, res, next) {
						console.log("\nFile uploaded.");
						//console.log("File:\n" + req.file);
						file = req.file.path;
						console.log("\nPath:\n" + file);

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
        app.listen(3000);
        break;
}
