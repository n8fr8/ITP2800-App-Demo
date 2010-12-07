var win = Titanium.UI.currentWindow;

var android = Ti.Platform.name;// == 'android';



var tableview = Titanium.UI.createTableView({});
Titanium.UI.currentWindow.add(tableview);

tableview.addEventListener('click',function(e)
{
	
	var mapWin = Ti.UI.createWindow({
		url:"mapview.js"
	});

	mapWin.title = e.row.venuename;
	mapWin.lat = e.row.lat;
	mapWin.lon = e.row.lon;
	mapWin.address = e.row.address;
		
	mapWin.open({modal:true});
});
			

var navActInd = Titanium.UI.createActivityIndicator();
navActInd.message = "loading location...";
win.setRightNavButton(navActInd);


function findVenueByGPS ()
{
	navActInd.show();

	Ti.API.info("starting geo");
	
	Ti.Geolocation.purpose = 'searching for nearby venues';

	Titanium.Geolocation.getCurrentPosition(function(e)
	{
	
		Ti.API.info("received geo response");
		if (e.error)
		{
			alert(e.error);

			navActInd.hide();
			return;
		}

	
		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		
		getVenues (latitude, longitude);
	});
	
	}
	
	
	function getVenues (latitude, longitude)
	{
	
		navActInd.show();
		//label.text = "You are at: "+longitude+"\n"+latitude+"\n\nFinding venues...";

		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e)
		{
			Ti.API.info("ERROR " + e.error);
			navActInd.hide();
			alert(e.error);
		};

		xhr.onload = function()
		{
		

			var resp =  eval('('+this.responseText+')');
			var venues = resp.groups[0].venues;
			
			for (var i=0;i<venues.length;i++)
			{
				var row = Ti.UI.createTableViewRow({height:40});
				
				row.venuename = venues[i].name;
				
				Ti.API.info("got venue: " + venues[i].name);
				
				var labelTitle = Ti.UI.createLabel({
					text:venues[i].name,
					left:55,
					top:3,
					height:15
				
				});
			
				row.add(labelTitle);
				
				if (venues[i].address)
				{

				var address = venues[i].address + ", " + venues[i].city + ", " + venues[i].state;
				var labelSummary = Ti.UI.createLabel({
					text:venues[i].address,
					left:55,
					top:20,
					font:{fontSize:12}
				});
				row.add(labelSummary);
				row.address = address;
				}
				
				if (venues[i].primarycategory)
				{
					var img = Ti.UI.createImageView({
						image:venues[i].primarycategory.iconurl,
						left:0,
						height:40,
						width:50
					});
					row.add(img);
				}
			
				row.lat = venues[i].geolat;
				row.lon = venues[i].geolong;

				tableview.appendRow(row);
				
			}

			navActInd.hide();
		};
		// open the client and encode our URL
		xhr.open('GET','http://api.foursquare.com/v1/venues.json?l=25&q=&geolat='+latitude+'&geolong='+longitude);
		
		// base64 encode our Authorization header
		//xhr.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(username.value+':'+password.value));

		// send the data
		xhr.send();
		Ti.API.info("sending foursquare API request for "+latitude+","+longitude);
	
}


//findVenueByGPS();

	getVenues (40.729874, -73.993462);
