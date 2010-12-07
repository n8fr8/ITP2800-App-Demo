
var winMap = Titanium.UI.currentWindow;

var myLocationPoint = Titanium.Map.createAnnotation({
    latitude:40.685413,
    longitude:-73.974449,
    title:"Witness HQ",
    subtitle:'Brooklyn, NY',
    pincolor:Titanium.Map.ANNOTATION_RED,
    image:'http://a3.twimg.com/profile_images/1063386091/DaddyPutsElizaToSleep_bigger.jpg',
    animate:true,
    leftButton: '../images/appcelerator_small.png',
    myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
});
 
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:40.685413, longitude:-73.974449, 
            latitudeDelta:0.02, longitudeDelta:0.02},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[myLocationPoint]
});
 
winMap.add(mapview);

