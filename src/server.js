const app = require("./index")

const connect = require("./configs/db")

app.listen(2345, async function () {
    await connect();
    console.log("listening on port 2345  ");
    console.log('  \\{^_^}/ hi!')
})
//$ git push . HEAD:BACKEND
//$ git push origin BACKEND