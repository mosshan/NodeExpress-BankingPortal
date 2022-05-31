const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const accountData = fs.readFileSync('src/json/accounts.json',{encoding:'utf8', flag:'r'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json',{encoding:'utf8', flag:'r'});
const users = JSON.parse(userData);

app.get('/', (request, result) => { 
  result.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', (request, result)=>{
  result.render('account', {account: accounts.savings});
})

app.get('/checking', (request, result)=>{
  result.render('account', {account: accounts.checking});
})

app.get('/credit', (request, result)=>{
  result.render('account', {account: accounts.credit});
})

app.get('/profile', (request, result)=>{
  result.render('profile', {user: users[0]});
})

app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
