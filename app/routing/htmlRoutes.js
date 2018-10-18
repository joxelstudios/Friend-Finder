// Dependencies
var http = require("http");
var fs = require("fs")

var PORT = 8080;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var path = req.url;
    switch (path) {
        default:
            return fs.readFile(__dirname + "../public/home.html", function (err, data) {

                // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
                // an html file.
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(data);
            });
        case "/survey": return renderSurvey();
    }


    // Saving the request data as a variable
    var requestData = "";

    // When the server receives data...
    req.on("data", function (data) {

        // Add it to requestData.
        requestData += data;
    });

    // When the request has ended...
    req.on("end", function () {

        // Log (server-side) the request method, as well as the data received!
        console.log("You did a", req.method, "with the data:\n", requestData);
        res.end();
    });

}

function renderSurvey(req, res) {
    //saving the request posted data as a variable
    var requestData = "";

    //when the server receives data
    req.on('data', function (data) {
        requestData += data;
        console.log("You just posted some data to the server:\n", requestData);

        myHTML = "<html><head><title>hello noders</title></head><body>" + "<h1><code>" + requestData + "</code></h1>" + "</body></html>"
    });

    req.on('end', function() {
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(myHTML);
    });
}

// Start our server
server.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});