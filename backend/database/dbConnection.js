

const mysql      = require('mysql');
const dbConnection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.MYSQL_DB
});
dbConnection.connect(function(err){
if(!err) {
    console.log("Database is running...... ");
} else {
    console.log("Error connecting database ... ");
}
});
module.exports = dbConnection;
