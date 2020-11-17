const express = require("express");
const app = express();
const fs = require("fs");
const quotes = require("./quotes.json");
const port = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/quotes/:quoteid", (request, response) => {
  const id = parseInt(request.params.quoteid);
  const quote = quotes.find((quote) => {
    return quote.id == id;
  });
  response.send(quote);
});

app.get("/quotes", (request, response) => {
  const id = parseInt(request.params.quoteid);
  response.send(quotes);
});

app.post("/quotes", (request, response) => {
  // Read all quotes from Jason
  let rawQuotes = fs.readFileSync("./quotes.json");

  // Store all quotes on an array
  let jsonQuotes = JSON.parse(rawQuotes);

  // Retrieve the quote from the request body
  let newQuote = request.body;
  //   response.send(newQuote);

  // Assign a new id to object
  newQuote.id = jsonQuotes.length;
  //   response.send(newQuote);

  // Push new quote to array
  jsonQuotes.push(newQuote);
  //   response.send(jsonQuotes);

  // Save the quotes to the Jason
  let newQuotesJason = JSON.stringify(jsonQuotes);
  fs.writeFileSync("./quotes.json", newQuotesJason);
  response.send(jsonQuotes);
});

app.delete("/quotes/:quoteid", (request, response) => {
  // Read all quotes from Jason
  let rawQuotes = fs.readFileSync("./quotes.json");

  // Store all quotes on an array
  let jsonQuotes = JSON.parse(rawQuotes);

  // Filter the one that should be deleted
  const id = parseInt(request.params.quoteid);
  const QuoteToDelete = jsonQuotes.find((quote) => {
    return quote.id == id;
  });
  const indexOfQuoteToDelete = jsonQuotes.indexOf(QuoteToDelete);
  jsonQuotes.splice(indexOfQuoteToDelete, 1);
  //   response.send(QuoteToDelete);

  // Save the quotes to the Jason
  let newQuotesJason = JSON.stringify(jsonQuotes);
  fs.writeFileSync("./quotes.json", newQuotesJason);
  response.send(jsonQuotes);
});

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});
