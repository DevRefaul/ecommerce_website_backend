const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Server Is On Air")
})

app.listen(3000, () => {
    console.log(`Express is running on posrt ${3000}`);
})