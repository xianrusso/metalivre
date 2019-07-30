#!/usr/bin/env node

const fetch = require('node-fetch');
const prompts = require('prompts');

const url = "https://www.googleapis.com/books/v1/volumes?q="
const author = "inauthor:"
const title = "intitle:"
const subject = "subject:"

const questions = [
    // {
    //     type: 'toggle',
    //     name: 'value',
    //     message: 'Would you like to search by author?',
    //     initial: true,
    //     active: 'yes',
    //     inactive: 'no',
    //     // onRender(x) {
    //     //     return {
    //     //         type: 'text',
    //     //         name: 'author',
    //     //         message: 'What is the name of the author?',
    //     //         validate: name => fetch(`${url}/${author}${name.split(" ").join("+")}`).then(res => res.json()).then(json => console.log(json)),
    //     //     }
    //     // },
    // },
    {
        type: 'text',
        name: 'author',
        message: 'What is the name of the author?',
        validate: name => fetch(`${url}/inauthor:${name.split(" ").join("+")}&maxResults=1`)
                            .then(res => res.json())
                            .then(json => {
                                let item = json.items[0];
                                console.log(item.volumeInfo.title);
                                console.log(item.volumeInfo.authors);
                                console.log(item.volumeInfo.description);
                            })
                            ? true : false,
    },
    {
        type: 'text',
        name: 'title',
        message: 'What is the title of the book?',
    },
];

(async () => {
    const response = await prompts(questions);
})();
