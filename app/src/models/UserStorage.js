"use strict";

const db = require("../config/db");

class UserStorage {
   static getUserInfo(id) {
      return new Promise((resolve, reject) => {
         const query = "SELECT * FROM USER_INFO WHERE user_id = ?;";
         db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            resolve(data[0]);
         });
      });
   }

   static async save(userInfo) {
      return new Promise((resolve, reject) => {
         const query = "INSERT INTO USER_INFO(user_id, password, nickname, email) VALUES(?,?,?,?);";
         db.query(
            query,
            [userInfo.user_id, userInfo.password, userInfo.nickname, userInfo.email],
            (err) => {
               if (err) reject(`${err}`);
               resolve({ success: true });
            }
         );
      });
   }
}

module.exports = UserStorage;
