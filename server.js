const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => console.log(`escuchando en puerto 8080`))
const io = new IOServer(expressServer)

const fs = require("fs");
const { Router } = require('express');
const router = Router();
const arrayMsj = []

// Class
const Contenedor = require('./class.js');
let chat = new Contenedor;

const products = [{
    "title": "Lapiz",
    "price": 1500,
    "thumbnail": "https://www.quieninvento.org/wp-content/uploads/2013/06/Lapiz.jpg",
    "id": 1
},
{
    "title": "Libro 2",
    "price": 1000,
    "thumbnail": "https://staticr1.blastingcdn.com/media/photogallery/2017/1/24/660x290/b_1200x630/firenze-libro-aperto-in-arrivo-il-primo-festival-dedicato-all-firenzetoday-it_1106657.jpg",
    "id": 2
},
{
    "title": "Libro de algun otro",
    "price": 700,
    "thumbnail": "https://www.freejpg.com.ar/asset/900/77/7765/F100004696.jpg",
    "id": 3
}
]


app.use(express.static(path.join(__dirname, './public')))





io.on('connection', async socket => {
        console.log('Se conecto un usuario nuevo', socket.id)
        socket.emit('server:products', products)

        socket.on('client:product', async product => {
            products.push(product)
            io.emit('server:product', product)
})

        socket.emit('server:msgs', arrayMsj);
        socket.on('client:msg', msgInfo => {
            arrayMsj.push(msgInfo);
            chat.save(msgInfo);
            io.emit('server:msgs', arrayMsj)
        })

        socket.on('cliente:typing', typeValue => {
            socket.broadcast.emit('server:typing', typeValue)
        })

})