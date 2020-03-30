var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "agriedge"
});
var data = {
  host: "localhost",
  user: "root",
  password: "",
  database:"agriedge"
}

con.connect(function(err) {
  if (err) 
  {
    throw err;
  }
  console.log("Connected!");
})

global.con = con

module.exports = data
