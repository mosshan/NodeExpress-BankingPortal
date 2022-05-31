const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

const accountData = fs.readFileSync('src/json/accounts.json',{encoding:'utf8', flag:'r'});
const accounts = JSON.parse(accountData);


const userData = fs.readFileSync('src/json/users.json',{encoding:'utf8', flag:'r'});
const users = JSON.parse(userData);

app.get('/', (req, res) => { 
  res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', (req, res)=>{
  res.render('account', {account: accounts.savings});
});

app.get('/checking', (req, res)=>{
  res.render('account', {account: accounts.checking});
});

app.get('/credit', (req, res)=>{
  res.render('account', {account: accounts.credit});
});

app.get('/profile', (req, res)=>{
  res.render('profile', {user: users[0]});
});

app.get('/payment', (req, res)=>{
  res.render('payment', {account: accounts.credit});
});

app.post('/payment', (req, res)=>{
  accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(req.body.amount);
  accounts.credit.available = parseInt(req.body.amount) + parseInt(accounts.credit.available);
  accountsJSON = JSON.stringify(accounts);
  var writePath = path.join(__dirname, '/json/accounts.json');
  fs.writeFileSync(writePath, accountsJSON, {encoding:'utf8', mode:'w'});
  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.get('/transfer',(req, res)=>{
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  var from = req.body.from;
  var to = req.body.to;
  var amount = req.body.amount;
  accounts[from].balance = parseInt(accounts[from].balance) - parseInt(amount);
  accounts[to].balance = parseInt(accounts[from].balance) + parseInt(amount);
  accountsJSON = JSON.stringify(accounts);
  var writePath = path.join(__dirname, '/json/accounts.json');
  fs.writeFileSync(writePath, accountsJSON, {encoding:'utf8', mode:'w'});
  res.render('transfer', {message: "Transfer Completed"});

})

app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
