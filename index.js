const express = require("express")
const cors = require("cors")
const app = express()
const allproducts = require("./Products.json")
const electronics = require("./electronics.json")
const fashion = require("./fashion.json")
const furniture = require("./furniture.json")
const plants = require("./plants.json")
const trendingProducts = require("./trendingproducts.json")


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
app.get("/furnitures", (req, res) => {
    res.send(furniture)
})
app.get("/plants", (req, res) => {
    res.send(plants)
})
app.get("/trendingProducts", (req, res) => {
    res.send(trendingProducts)
})

app.get("/getSingleProductInfo", async (req, res) => {
    try {
    const requestedProduct = req.query.name.replace(/"/g, '')
    const product = await allproducts.products.find((product) => {
        if (product.name == requestedProduct) {
            return product
        }
    })
    if (product) {
        res.send({
            message: "Success",
            satus: 200,
            product: product
        })

    } else {
        res.send({
            message: "Can't Find The Product",
            satus: 401,
        })
    }
} catch (error) {
    res.send({
        message: error.message,
        satus: 404,
    })
}

})

app.poast("/addSingleProduct", async (req, res) => {
    try {
    const porductInfo = req.query.product
    if (product) {
        res.send({
            message: "Successfully Added Products",
            satus: 200,
           
        })

    } else {
        res.send({
            message: "Can't Find The Product",
            satus: 401,
        })
    }
} catch (error) {
    res.send({
        message: error.message,
        satus: 404,
    })
}

})



app.listen(5000, () => {
    console.log(`Express is running on port ${5000}`);
})