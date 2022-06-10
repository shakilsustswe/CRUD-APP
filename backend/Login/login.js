const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { query } = require("express");
const dbConnection = require("./../database/dbConnection");
///const { send } = require("process");
exports.login = async (req, res) => {
  const userName = req.body.UserName;
  const password = req.body.Password;
  console.log(userName, password);
  dbConnection.query(
    "SELECT * FROM users WHERE UserName  = ? ",
    [userName],
    async (err, results) => {
      console.log(results, err);
      if (err) {
        return res.status(400).json(err);
      }

      bcrypt.compare(password, results[0]["Password"], (err1, result1) => {
        console.log(err1, result1, password);
        if (err1) {
          console.log(err1);
          return res.status(401).json({
            message: "username or password is incorrect .........",
          });
        }

        if (result1) {
          console.log(result1);
          const token = jwt.sign(
            {
              username: userName,
              userId: results[0].ID,
            },
            "secret",
            {
              expiresIn: "7d",
            }
          );
          return res.status(200).json({
            message: "Successfully logged in",
            token,
            user: results[0],
          });
        }

        return res.status(401).json({
          message: "username or password is incorrect dsFFSD",
        });
      });
    }
  );
};
