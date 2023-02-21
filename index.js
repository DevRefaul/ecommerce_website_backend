const express = require("express")
const cors = require("cors")
const app = express()


app.use(cors())


app.get("/", (req, res) => {
    res.send("Server Is On Air")
})

app.get("/products", (req, res) => {
    res.send("All The products are here")
})



app.listen(5000, () => {
    console.log(`Express is running on port ${5000}`);
})