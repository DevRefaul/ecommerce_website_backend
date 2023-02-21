const express = require("express")
const cors = require("cors")
const app = express()
const allproducts = require("./Products.json")
const electronics = require("./electronics.json")
const fashion = require("./fashion.json")


app.use(cors())


app.get("/", (req, res) => {
    res.send("Server Is On Air")
})

app.get("/allProducts", (req, res) => {
    res.send(allproducts)
})
app.get("/fashion", (req, res) => {
    res.send(fashion)
})
app.get("/electronics", (req, res) => {
    res.send(electronics)
})



app.listen(5000, () => {
    console.log(`Express is running on port ${5000}`);
})