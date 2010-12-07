var winMap = Titanium.UI.currentWindow;

var mapview;



if (winMap.address)
{

	findGeo(winMap.title,winMap.address);
}
else
{
	
	showMap(winMap.lat, winMap.lon);
	addResultToMap(winMap.title,winMap.lat,winMap.lon);
}


function showMap(centerLat, centerLon)
{
	mapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:centerLat, longitude:centerLon,
		  latitudeDelta:0.01, longitudeDelta:0.01},
	    animate:true,
	    regionFit:true,
	    userLocation:true
	});


	winMap.add(mapview);
}

function addResultToMap(title, lat, lon)
{

	Ti.API.info("adding point to map: " + lat + "," + lon);

var myLocationPoint = Titanium.Map.createAnnotation({
    latitude:lat,
    longitude:lon,
    title:title,
    pincolor:Titanium.Map.ANNOTATION_RED,
   // image:searchResultRow.image,
    animate:true,
    myid:title // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
});

   mapview.addAnnotation(myLocationPoint);


}

function findGeo(title, address)
{

	
var navActInd = Titanium.UI.createActivityIndicator();
navActInd.message = "getting geo from address...";
winMap.setRightNavButton(navActInd);
navActInd.show();

    var geoURL =
"http://maps.googleapis.com/maps/api/geocode/json?address=" +
escape(address) + "&sensor=false";

	Ti.API.info("doing geo lookup: " + geoURL);

    	var xhr = Titanium.Network.createHTTPClient();

        xhr.onerror = function(e)
        {
            Ti.API.info("ERROR " + e.error);
navActInd.hide();

            alert(e.error);
        };

        xhr.onload = function()
        {
navActInd.hide();

	    Ti.API.info("got geo response: " + this.responseText);

            var geodata =  eval('('+this.responseText+')');

           //THIS IS WHERE I GET THE LAT AND LONG
           var lat = geodata.results[0].geometry.location.lat;
           var lon = geodata.results[0].geometry.location.lng;

	    showMap(lat,lon);
     	    addResultToMap(title, lat, lon);


        };
        // open the client and encode our URL

     	xhr.open('GET',geoURL);
	xhr.send();


 }

