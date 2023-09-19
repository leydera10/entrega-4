import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io"; // server 
import { Socket } from "dgram";
import { Console } from "console";


const app = express()
const PORT = process.env.PORT || 8080;

const httServer = app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`); // SOLO EL SERVER HTTP
});



const socketServer = new Server(httServer)


socketServer.on("connection", (socket) => {
    //console.log("Estamos onfire");

    socket.on("msj", (data) => {
        console.log(data);
    });

    socket.on("newProd", async (newProduct) => {
        const product = new ProductManager();
        const result = await product.addProducts(newProduct);// no borrar
        socketServer.emit("success", 'Producto agregado !!'); // Emitir el evento "success" a todos los clientes
    });

    socket.emit("test", "msj from server to client", "added product ok");
});


   

const product = new ProductManager();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

//handelbars

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

// stactic

app.use(express.static(path.join(__dirname, "public")));


// socket

app.use("/realTimeProduct", ProductRouter);


app.get("/", async (req, res)=>{
    let allProducts = await product.getProducts()
    res.render("partials/home", {
        title: "Express Avanzado | Handelbars",
        products : allProducts

    })
})

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)

