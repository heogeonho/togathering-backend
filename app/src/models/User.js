"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
      this.body = body;
    }

    login() {
        const client = this.body;
        const { id, psword } = UserStorage.getUserInfo(client.id);

        if (id) {
            if(id === client.id && psword === client.psword) {
                return { success: true };
           }
           return { success: false, msg: "비밀번호가 틀렸습니다" };
        }   
        return { success: false, msg: "아이디가 없습니다" };
    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client)
        return response;
    }
}

module.exports = User;