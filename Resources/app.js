// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//the window and webview for displaying youtube player (iOS only)
var webModal;
var webModalView;

//stores the current link being displayed in the web view
var currentLink;

var win1, win2, win3;


// create tab group
var tabGroup = Titanium.UI.createTabGroup();



//
// create base UI tab and root window
//
win1 = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Home',
    window:win1
});

var webViewHome = Ti.UI.createWebView();
webViewHome.scalesPageToFit = true;
webViewHome.url = 'http://www.google.com/gwt/x?u=http://itp.nyu.edu/sigs/program/&noimg=1&btnGo=Go&source=wax&ie=UTF-8&oe=UTF-8';

win1.add(webViewHome);


//
// create controls tab and root window
//
win2 = Titanium.UI.createWindow({  
    title:'Videos',
    backgroundColor:'#fff',
    url:'youtube.js'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Videos',
    window:win2
});




//
// create controls tab and root window
//
winMap = Titanium.UI.createWindow({
	title:'Map',
    url:'mapdbview.js'
});
var tabMap = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Map',
    window:winMap
});


// create controls tab and root window
//
var winTable = Titanium.UI.createWindow({
	title:'Contact List',
    url:'mytable.js'
});
var tabTable = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Contacts',
    window:winTable
});


var winFoursquare = Titanium.UI.createWindow({
	title:'Nearby Venues',
    url:'foursquare.js'
});
var tabFoursquare = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Nearby',
    window:winFoursquare
});


var winRSS= Titanium.UI.createWindow({
	title:'RSS',
    url:'rss.js'
});
var tabRSS = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'RSS',
    window:winRSS
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2); 
tabGroup.addTab(tabTable);
tabGroup.addTab(tabFoursquare);
tabGroup.addTab(tabRSS);






// open tab group
tabGroup.open();






