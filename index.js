#!/usr/bin/env node

const fetch = require('node-fetch')
const prompts = require('prompts')

const url = "https://www.googleapis.com/books/v1/volumes?q="
const title = "intitle:"
const subject = "subject:"

const questions = [
    {
        type: 'text',
        name: 'author',
        message: 'Who is the author and what is the title of the book?',
        validate: name => fetch(`${url}/inauthor:${name.split(" ").join("+")}&intitle:${name.split(" ").join("+")}&maxResults=1`)
                            .then(res => res.json())
                            .then(json => {
                                let item = json.items[0];
                                console.log(`Title: ${item.volumeInfo.title}`);
                                console.log(`Author: ${item.volumeInfo.authors}`);
                                console.log(`Description: ${item.volumeInfo.description}`);
                                console.log(`Page Count: ${item.volumeInfo.pageCount}`)
                            })
                            ? true : console.log('BRR'),
    },
];

(async () => {
    const response = await prompts(questions);
})();
