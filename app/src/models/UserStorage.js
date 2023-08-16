"use strict";

class UserStorage {
    static #users = {
        id: ["user001", "user002"],
        psword: ["123","123"],
        name: ["홍길동", "김길동"]
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;