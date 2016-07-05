var Converter = require("csvtojson").Converter;
var prompt = require('prompt');

var source = "";

var converter = new Converter({});
prompt.start();

converter.transform=function(json,row,index){
	switch(source){
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
		 case "survey":
		 	break;
	}//add blank keys, check survey first
    

};

prompt.get(['filename', 'destination', 'source'], function (err, result) {
	source = result.source;

    converter.on("end_parsed", function (jsonArray) {
   		console.log(jsonArray); //here is your result jsonarray
   		
	});
	require("fs").createReadStream(result.filename).pipe(converter);//CHANGE BACK TO RESULT.FILENAME
 });

