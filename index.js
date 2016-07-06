"use strict";

var Converter = require("csvtojson").Converter;
var prompt = require('prompt');
var path = require('path');
var express = require('express');
var app = new express();
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));

var source = "";
var file;
var whichInterface = "web";

var converter = new Converter({});
prompt.start();

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
            require("fs").createReadStream(file).pipe(converter);
        });
        break;
    case "web":
        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname + '/index.html'));
        });

        var uploader = multer({
            dest: __dirname + '../uploads/',
        });

        router.post('/upload', function(req, res) {
            console.log("uploading");
        });

        app.listen(3000);
        // file = /uploads/
        break;
}
