var express = require("express");

var path = require("path");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var views = path.join(process.cwd(), "views");

var urls = [];

app.get("/", function(req, res) {
    var homePath = path.join(views, "home.html");
    res.sendFile(homePath);
});

app.get("/", function(req, res) {
    var text = "<a href='/urls'>/urls</a>";
    res.send(text);
});

app.get("/urls", function(req, res) {
    var urlText = urls.join(", ");
    res.send(urlText);
});

app.post("/urls", function(req, res) {
    var url = req.body.url.address;
    urls.push(url);
    var i = urls.length - 1;
    res.send("View at localhost:3000/urls/" + i);
    console.log(req.body.url.address);
});

app.get("/urls/:index", function (req, res) {
    var newUrl = urls[req.params.index];
    res.redirect(newUrl);
});

app.listen(3000, function(req, res) {
    console.log("working!!")
});