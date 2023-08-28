const express = require ('express')
const manager = require('./productManager')

const app = express()
app.use(express.json())

app.get('/', (req,res) => {
    res.send(manager.getProducts())
})

app.get('/products', (req,res) => {
    const limit = req.query.limit
    const productos = manager.getProducts()
    const limits = productos.filter( p => p.id <= limit )

    if (!limit)  return res.send(productos)
    res.send(limits)
})


app.get('/products/:pid', (req, res) => {
    const id = req.params.pid
    const productos = manager.getProducts()
    const found = productos.find( p => p.id === +id )

    if (!found) return res.send( {
        code:404,
        message: 'El producto no existe'
    })
    res.send(found)
})

app.listen (8080, () => console.log('Server up') )