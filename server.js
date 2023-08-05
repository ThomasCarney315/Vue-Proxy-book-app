// use express to handle requests from the vue app and then format the request and forward to the books api then return the response to the vue app formatted as json ?? 
const express = require('express');
const app = express();
const cors = require('cors');
const xml2js = require('xml2js');


require("dotenv").config({ path: "./.env" });

const key = process.env.KEY;
const secret = process.env.SECRET;

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/api',async (request, response)=>{ 
    try {
        const { query, page } = request.query;

        const res = await fetch(`https://www.goodreads.com/search/index.xml?key=${key}&q=${query}&page=${page}`);
        const xml = await (await res.text()).replace('<?xml version="1.0" encoding="UTF-8"?>', '');
        const json = await xml2js.parseStringPromise(xml);

        // Extract relevant data
        const books = json.GoodreadsResponse.search[0].results[0].work;
        const allPages = Math.ceil(json.GoodreadsResponse.search[0]["total-results"] / 20);

        // Format the response
        const formattedBooks = books.map((book) => ({
            id: book.best_book[0].id[0]._,
            title: book.best_book[0].title[0],
            author: book.best_book[0].author[0].name[0],
            image: book.best_book[0].image_url[0],
        }));
        response.json([formattedBooks, allPages]);
    }
    catch (error) { 
        console.log(error);
    }
})

//Server Running
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}, you better catch it!`);
  });
