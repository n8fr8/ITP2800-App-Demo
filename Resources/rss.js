// Example functions to load an RSS feed url then display items in a tableView
// Requires Titanium mobile 0.9.1 or above
// Kosso ( twitter.com/kosso )
// Used by Permission

// eg:

//var url = 'http://rss.cnn.com/services/podcasting/newscast/rss.xml';
var url = 'http://newyork.craigslist.org/search/sss?query=curb+alert&srchType=A&minAsk=&maxAsk=&format=rss';
//var url = 'http://newyork.craigslist.org/search/sss?query=electronics&srchType=A&minAsk=&maxAsk=&format=rss';

// loadRRSFeed(url) // is at the bottom of the js - after all the functions

// useful for getting rid of html links in text elements in a feed
Titanium.include('strip_tags.js');  
// see: http://pastie.org/837981

///////////////////////////////////////////////////////

var data;
var i = 0;
var feedTableView;
var feedTitle = '';

Ti.UI.currentWindow.barColor = '#b40000';

var stream = Ti.Media.createAudioPlayer();

var item_window = Ti.UI.createView({

	backgroundColor:'#b4b4b4',
	borderRadius:8,
	right:5,
	left:5,
	height:100,
	bottom:5

});
Ti.UI.currentWindow.add(item_window);
var item_title_label = Ti.UI.createLabel({
	text: '',
	color: '#fff',
	textAlign:'center',
	left:10,
	right:10,
	top:5,
	height:45,
	font:{fontFamily:'Helvetica Neue',fontWeight:'bold',fontSize:18}
	});
item_window.add(item_title_label);
var item_desc_label = Ti.UI.createLabel({
	text: '',
	color: '#000',
	textAlign:'center',
	left:10,
	right:10,
	top:55,
	height:40,
	font:{fontFamily:'Helvetica Neue',fontWeight:'bold',fontSize:13}
	});
item_window.add(item_desc_label);

function displayItems(itemList){

	for (var c=0;c < itemList.length;c++){	

		// Ti.API.info('item title :' + itemList.item(c).getElementsByTagName("title").item(0).text);
		// Ti.API.info('item description :' + itemList.item(c).getElementsByTagName("description").item(0).text);
		// Ti.API.info('item enclosure url :' + itemList.item(c).getElementsByTagName("enclosure").item(0).getAttribute("url"));
		
		var title = null;
		var desc = null;
		var mp3_url = null;
		
		// If we want to only add items with mp3 enclosures
		if(itemList.item(c).getElementsByTagName("enclosure")!=null){

			// Item title
			title = itemList.item(c).getElementsByTagName("title").item(0).text;
			// Item description
			desc = itemList.item(c).getElementsByTagName("description").item(0).text;
			// Clean up any nasty linebreaks in the title and description			
			title = title.replace(/\n/gi, " ");			
			desc = desc.replace(/\n/gi, " ");

			// Podcast mp3 enclosure
/*
			if (itemList.item(c).getElementsByTagName("enclosure"))
			{
				mp3_url = itemList.item(c).getElementsByTagName("enclosure").item(0).getAttribute("url");
			}*/

			// Create a table row for this item
			var row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#eeeeee',selectedBackgroundColor:'#b40000'}); 

			// Create a label for the title
			var post_title = Ti.UI.createLabel({
				text: title,
				color: '#000',
				textAlign:'left',
				left:10,
				height:'auto',
				width:'auto',
				top:3,
				font:{fontWeight:'bold',fontSize:16}
			});
			row.add(post_title);
			
			
			// Add some rowData for when it is clicked			
			row.thisTitle = title;
			row.thisMp3 = mp3_url;
			row.thisDesc = desc;
			
			// Add the row to the data
			data[i] = row;
			// I use 'i' here instead of 'c', as I'm only adding rows which have mp3 enclosures
			i++;
			
		} // end if enclosure		
	}
	
	// create the table
	feedTableView = Titanium.UI.createTableView({
		data:data
	});
	
	// Add the tableView to the current window
	Titanium.UI.currentWindow.add(feedTableView);
	
	// Create tableView row event listener
	feedTableView.addEventListener('click', function(e){

		// a feed item was clicked
		Ti.API.info('item index clicked :'+e.index);
		Ti.API.info('title  :'+e.rowData.thisTitle);
		Ti.API.info('description  :'+strip_tags(e.rowData.thisDesc));
		Ti.API.info('mp3 enclosure  :'+e.rowData.thisMp3);
		// show an alert
		// Ti.UI.createAlertDialog({title:e.rowData.thisTitle, message:e.rowData.thisMp3}).show();
		
//		item_title_label.text = strip_tags(e.rowData.thisTitle);
//		item_desc_label.text = strip_tags(e.rowData.thisDesc);

		var address = e.rowData.thisTitle;
		var startParen = address.indexOf("(");
		var endParen = address.indexOf(")");
		address = address.substring(startParen+1,endParen);

		var mapWin = Ti.UI.createWindow({
			url:"mapview.js"
		});

		mapWin.title = e.rowData.thisTitle;
		mapWin.address = address + ", New York, NY";
		
		mapWin.open({modal:true});

		// etc ...	
		// now do some cool stuff! :)
		// like add an audio player, open a new window, etc..
		
		if (e.rowData.thisMp3)
		{
			stream.stop();
			stream.url = e.rowData.thisMp3;
			stream.start();
		}
		 
	});
}

function loadRSSFeed(url){

	data = [];
	Ti.API.info('>>>> loading RSS feed '+url);
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET',url);
	xhr.onload = function()
	{
			
		Ti.API.info('>>> got the feed! ... ');
		
		// Now parse the feed XML 
		var xml = this.responseXML;
		
		// Find the channel element 
		var channel = xml.documentElement.getElementsByTagName("channel");

		feedTitle = channel.item(0).getElementsByTagName("title").item(0).text;
		
		Ti.API.info("FEED TITLE " + feedTitle);
		
		Titanium.UI.currentWindow.title = feedTitle;
		// Find the RSS feed 'items'
		var itemList = xml.documentElement.getElementsByTagName("item");
		Ti.API.info('found '+itemList.length+' items in the RSS feed');

		item_title_label.text = 'DONE';
		item_desc_label.text = 'click a feed item';
		item_window.hide();
		// Now add the items to a tableView
		displayItems(itemList);

	};
	
	item_title_label.text = 'LOADING RSS FEED..';
	item_desc_label.text = '';
	xhr.send();	
}


// RIGHT NAVBAR REFRESH BUTTON		
var r = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
r.addEventListener('click',function()
{
	// reload feed
	loadRSSFeed(url);	
});
Titanium.UI.currentWindow.setRightNavButton(r);


// load the feed
loadRSSFeed(url);

function findGeo(address, row)
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

	   row.lat = lat;
	   row.lon = lon;


        };
        // open the client and encode our URL

     	xhr.open('GET',geoURL);
	xhr.send();


 }
