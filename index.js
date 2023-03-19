const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ObjectId } = require("mongodb")
const app = express()

app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x2z0ouy.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)

const allproducts = require("./Products.json")
const electronics = require("./electronics.json")
const fashion = require("./fashion.json")
const furniture = require("./furniture.json")
const plants = require("./plants.json")
const trendingProducts = require("./trendingproducts.json")




async function dbActions() {

    // console.log(client);
    const Database = client.db("Rafees-Shop")
    const products = Database.collection("Products")
    try {

        app.get("/productsFromDB", async (req, res) => {
            try {
                const filter = { _id: ObjectId("64172dd53dfdc60a2f5f7e5a") }
                const product = await products.findOne(filter)
                res.send(product)
            } catch (error) {
                console.log(error.message);
                res.send(error.message);
            }
        })


    } catch (error) {
        console.log(error.message);
    }
}

dbActions()


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

app.post("/addSingleProduct", async (req, res) => {
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