const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ObjectId } = require("mongodb")
const app = express()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rafeesshop.7o4vkyz.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)


const allproducts = require("./Products.json")
const electronics = require("./electronics.json")
const fashion = require("./fashion.json")
const furniture = require("./furniture.json")
const plants = require("./plants.json")
const trendingProducts = require("./trendingproducts.json")


const dbActions = async () => {

    const Products = client.db("Rafees_Shop").collection("Products")

    try {

        // api for all products
        app.get("/allproducts", async (req, res) => {

            try {
                const products = await Products.find({}).toArray()
                res.send({
                    message: "Successful",
                    products
                })
            } catch (error) {
                console.log(error.message);
                res.send({
                    message: error.message,
                })
            }
        })

        // api for fashion products
        app.get("/productcategory", async (req, res) => {

            try {
                const productCategory = req.query.category
                const filter = { category: productCategory }
                const productsOfCategory = await Products.find(filter).toArray()
                res.send({
                    message: "Successful",
                    productsOfCategory
                })
            } catch (error) {
                console.log(error.message);
                res.send({
                    message: error.message,
                })
            }
        })

        // api for getting single product info

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



    } catch (error) {
        console.log(error.message);
    }


}

dbActions().catch(err => console.log(err.message))


app.get("/", (req, res) => {
    res.send("Server Is On Air")
})

app.get("/trendingProducts", (req, res) => {
    res.send(trendingProducts)
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