const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync('src/json/accounts.json',{encoding:'utf8', flag:'r'});
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('src/json/users.json',{encoding:'utf8', flag:'r'});
const users = JSON.parse(userData);

module.exports = {accounts, users, writeJSON};

function writeJSON(){
  accountsJSON = JSON.stringify(accounts);
  var writePath = path.join(__dirname, '/json/accounts.json');
  fs.writeFileSync(writePath, accountsJSON, 'utf8');
}