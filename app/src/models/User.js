"use strict";

const UserStorage = require("./UserStorage");

class User {
   constructor(body) {
      this.body = body;
   }

   async login() {
      const client = this.body;
      try {
         const user = await UserStorage.getUserInfo(client.user_id);
         console.log("User.js 로그인 단계 user   " + JSON.stringify(user));
         console.log("User.js 로그인 단계 client   " + JSON.stringify(client));
         if (user) {
            if (user.user_id === client.user_id && user.password === client.password) {
               return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다" };
         }
         return { success: false, msg: "아이디가 없습니다" };
      } catch (err) {
         return { success: false, msg: err };
      }
   }

   async register() {
      const client = this.body;
      try {
         const response = await UserStorage.save(client);
         return response;
      } catch (err) {
         return { success: false, msg: err };
      }
   }
}

module.exports = User;
