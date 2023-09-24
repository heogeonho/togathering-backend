"use strict";

const user_id = document.querySelector("#user_id"),
   password = document.querySelector("#password"),
   loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
   const req = {
      user_id: user_id.value,
      password: password.value,
   };

   fetch("/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
   })
      .then((res) => res.json())
      .then((res) => {
         if (res.success) {
            location.href = "/";
         } else {
            alert(res.msg);
         }
      })
      .catch((err) => console.error("로그인 과정 중 에러 발생"));
}
