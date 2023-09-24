"use strict";

const app = require("../app");

app.set('port', process.env.PORT || 3000)

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
 });
 