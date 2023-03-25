const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 5000
require("dotenv").config()
const { MongoClient, ObjectId } = require("mongodb")
const app = express()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rafeesshop.7o4vkyz.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)


const dbActions = async () => {

    const Products = client.db("Rafees_Shop").collection("Products")
    const TrendingProducts = client.db("Rafees_Shop").collection("Trending_Products")
    const Users = client.db("Rafees_Shop").collection("Trending_Products")

    try {

        // basic api
        app.get("/", (req, res) => {
            res.send("Server Is On Air")
        })

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

        // api for all products category
        app.get("/productcategory", async (req, res) => {

            try {
                const productCategory = req.query.category
                const filter = { category: productCategory }
                const productsOfCategory = await Products.find(filter).toArray()
                res.send({
                    message: "Successful",
                    status: 200,
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
                const productId = req.query.id;
                const filter = { _id: new ObjectId(productId) }
                const product = await Products.findOne(filter);
                res.send({
                    message: "Successful",
                    status: 200,
                    product
                })

            } catch (error) {
                res.send({
                    message: error.message,
                    satus: 404,
                })
            }

        })

        // api for getting related data as product category
        app.get("/getrelateddata", async (req, res) => {

            try {
                const category = req.query.category;
                const filter = { category: category };
                const products = await Products.find(filter).toArray();
                res.send({
                    message: "Successful",
                    status: 200,
                    products
                })
            } catch (error) {
                res.send({
                    message: error.message,
                    status: 401,
                })
            }
        })


        // api for getting trending products
        app.get("/trendingProducts", async (req, res) => {
            try {

                const trendingProducts = await TrendingProducts.find({}).toArray()
                res.send({
                    message: "Successful",
                    status: 200,
                    trendingProducts
                })


            } catch (error) {
                res.send({
                    message: "Failed",
                    status: 401,
                })
            }
        })


        // api for user login
        app.get("/loginuser", async (req, res) => {
            try {
                const email = req.query.email;
                const password = req.query.password;

                // res.send({
                //     message: "Successful",
                //     status: 200,
                // })


            } catch (error) {
                res.send({
                    message: "Failed",
                    status: 401,
                })
            }
        })



    } catch (error) {
        console.log(error.message);
    }


}

dbActions().catch(err => console.log(err.message))


// app.post("/addSingleProduct", async (req, res) => {
//     try {
//     const porductInfo = req.query.product
//     if (product) {
//         res.send({
//             message: "Successfully Added Products",
//             satus: 200,
           
//         })

//     } else {
//         res.send({
//             message: "Can't Find The Product",
//             satus: 401,
//         })
//     }
// } catch (error) {
//     res.send({
//         message: error.message,
//         satus: 404,
//     })
// }

// })



app.listen(port, () => {
    console.log(`Express is running on port ${5000}`);
})