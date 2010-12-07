var winMap = Titanium.UI.currentWindow;

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:40.685413, longitude:-73.974449,
            latitudeDelta:0.02, longitudeDelta:0.02},
    animate:true,
    regionFit:true,
    userLocation:true
    //annotations:[myLocationPoint] //add locations later
});


winMap.add(mapview);


var searchResults =
[
    {title:"chair",address:"721 Broadway, New York,NY",lat:"",lon:""},
    {title:"old computer",address:"200 6th Avenue, Brooklyn,NY",lat:"",lon:""}
];



for (i = 0; i < searchResults.length; i++)
      findGeo(searchResults[i]);


function addResultToMap(searchResultRow)
{

	Ti.API.info("adding point to map: " + searchResultRow.lat + "," + searchResultRow.lon);

var myLocationPoint = Titanium.Map.createAnnotation({
    latitude:searchResultRow.lat,
    longitude:searchResultRow.lon,
    title:searchResultRow.title,
    pincolor:Titanium.Map.ANNOTATION_RED,
   // image:searchResultRow.image,
    animate:true,
    leftButton: '../images/appcelerator_small.png',
    myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
});

   mapview.addAnnotation(myLocationPoint);

}

function findGeo(searchResultRow)
{

    var geoURL =
"http://maps.googleapis.com/maps/api/geocode/json?address=" +
escape(searchResultRow.address) + "&sensor=false";

	Ti.API.info("doing geo lookup: " + geoURL);

    	var xhr = Titanium.Network.createHTTPClient();

        xhr.onerror = function(e)
        {
            Ti.API.info("ERROR " + e.error);
            alert(e.error);
        };

        xhr.onload = function()
        {

	    Ti.API.info("got geo response: " + this.responseText);

            var geodata =  eval('('+this.responseText+')');

           //THIS IS WHERE I GET THE LAT AND LONG
           searchResultRow.lat = geodata.results[0].geometry.location.lat;
           searchResultRow.lon = geodata.results[0].geometry.location.lng;

     		 addResultToMap(searchResultRow);


        };
        // open the client and encode our URL

     	xhr.open('GET',geoURL);
	xhr.send();


 }

