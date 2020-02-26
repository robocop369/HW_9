// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();
//


// ask user for fav color
// -- use inquirer


// make a call out to github for github info
// address for the data that you want
// provider -- axios
// example https://api.github.com/users/


// take data and print to pdf

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');
const axios = require("axios");
// const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
    {
        type: "input",
    message:"Enter Your GitHub username",
    name: "username"
    },
    {
        type: "input",
        name: "location",
        message: "Where are you from?"
      },
      {
        type: "input",
        name: "hobby",
        message: "What is your favorite hobby?"
      },
      {
        type: "input",
        name: "food",
        message: "What is your favorite food?"
      },
    {
        type: "input",
        name: "linkedin",
        message: "Enter your LinkedIn URL."
      },


    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "green",
            "blue",
            "pink",
            "red",
        ]
    }
])
.then(function({username}) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(function(res){
        console.log(res.data.avatar_url) // Profile Img
        console.log(res.data.login) // Username
        console.log(res.data.location) // Location
        console.log(res.data.blog) // Blog Link
        console.log(res.data.bio) // Bio
        console.log(res.data.public_repos) // Public Repos
        console.log(res.data.followers) // Follower 
        console.log(res.data.following) // Following
    })
})
}      
//need to connect with the other js file 

function generateHTML(answers) {
  return `
  <!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           .col {
           flex: 1;
           text-align: center;
           }
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
     </head>
     <body>
        <div class="wrapper">
           <div class="photo-header">
              <img src="${data.avatar_url}" alt="Photo of ${data.name}" />
              <h1>Hi!</h1>
              <h2>
              My name is ${data.name}!</h1>
              <h5>${data.company ? `Currently @ ${data.company}` : ""}</h5>
              <nav class="links-nav">
                 ${
      data.location
        ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/${
        data.location
        }"><i class="fas fa-location-arrow"></i> ${
        data.location
        }</a>`
        : ""
      }
                 <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
      data.html_url
      }"><i class="fab fa-github-alt"></i> GitHub</a>
                 ${
      data.blog
        ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
        data.blog
        }"><i class="fas fa-rss"></i> Blog</a>`
        : ""
      }
              </nav>
           </div>
           <main>
              <div class="container">
              <div class="row">
                 <div class="col">
                    <h3>${data.bio ? `${data.bio}` : ""}</h3>
                 </div>
                 </div>
                 <div class="row">
                 <div class="col">
                    <div class="card">
                      <h3>Public Repositories</h3>
                      <h4>${data.public_repos}</h4>
                    </div>
                 </div>
                  <div class="col">
                  <div class="card">
                    <h3>Followers</h3>
                    <h4>${data.followers}</h4>
                  </div>
                 </div>
                 </div>
                 <div class="row">
                 <div class="col">
                 <div class="card">
                    <h3>GitHub Stars</h3>
                    <h4>${data.stars}</h4>
                    </div>
                 </div>
                  <div class="col">
                  <div class="card">
                    <h3>Following</h3>
                    <h4>${data.following}</h4>
                    </div>
                 </div>
                 </div>
              </div>
           </main>
        </div>
     </body>
  </html>`;
  }
 
pdf.create(html).toFile('./test.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});


async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("profile.html", html);

    console.log("Successfully wrote to profile.html");
  } catch(err) {
    console.log(err);
  }
}

init();


