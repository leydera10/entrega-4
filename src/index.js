import express from "express"
import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import { Server } from "socket.io"
import mongoose from "mongoose"
import cartsRouter from "./router/carts.routes.js"
import messagesRouter from "./router/messages.routes.js"
import productsRouter from "./router/product.routes.js"
import uploadRouter from "./router/upload.routes.js"


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const httServer = app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})

mongoose.connect("mongodb+srv://leiderasis30:M2UCwmWsQlIGwGKC@cluster0.f7btw4v.mongodb.net/?retryWrites=true&w=majority")
.then (()=>{
    console.log("Conectado")
})

.catch(error =>{
    console.error("Error al conectarse a la BD " + error)
})

// Rutas para Validar CRUD con Postman
app.use("/api/carts", cartsRouter)
app.use("/api/msg", messagesRouter)
app.use("/api/prod", productsRouter)

// Prueba Multer 
app.use("/", uploadRouter)

//handelbars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"))


app.use("/", express.static(__dirname + "/public"));

app.get("/chat", async (req, res) => {
    
    res.render("chat", {
        title: "chat con mongoose",
    });
});
