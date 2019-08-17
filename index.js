#!/usr/bin/env node

const fetch = require('node-fetch');
const prompts = require('prompts');

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
                                console.log(item.volumeInfo.title);
                                console.log(item.volumeInfo.authors);
                                console.log(item.volumeInfo.description);
                            })
                            ? true : console.log('BRR'),
    },
];

(async () => {
    const response = await prompts(questions);
})();
