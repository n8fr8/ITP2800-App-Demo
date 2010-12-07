
var win = Titanium.UI.currentWindow;

var data = [
{title:"ITP Main Desk", link:'tel:2129981880'},
{title:"Nathan Freitas (txt me)", link:'sms:7185697272'},

];

var table = Titanium.UI.createTableView(
{data:data}
);

table.addEventListener('click',function(e)
{

//	alert("you clicked on: " + e.row.title);
	Ti.Platform.openURL(e.row.link);


});

/*
hey this is m code
*/

//asdlkjasldkjasldkj

/*
asdaskdjask
daslkdj
alskdjasl
dkjas
ldkjas
ldkjas
ldkjasd

*/

win.add(table);
