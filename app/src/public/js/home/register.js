"use strict";

const user_id = document.querySelector("#user_id"),
   email = document.querySelector("#email"),
   nickname = document.querySelector("#nickname"),
   password = document.querySelector("#password"),
   confirmPassword = document.querySelector("#confirm-password"),
   registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
   if (!user_id.value) return alert("아이디를 입력해주세요.");
   if (password.value !== confirmPassword.value) {
      return alert("비밀번호가 일치하지 않습니다.");
   }

   const req = {
      user_id: user_id.value,
      email: email.value,
      nickname: nickname.value,
      password: password.value,
   };

   fetch("/register", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
   })
      .then((res) => res.json())
      .then((res) => {
         if (res.success) {
            location.href = "/login";
         } else {
            alert(res.msg);
         }
      })
      .catch((err) => console.error("회원가입 과정 중 에러 발생"));
}
