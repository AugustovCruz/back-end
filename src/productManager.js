import fs from 'node:fs'
const filename = './src/data/datos.json'

class productManager {

    constructor() {
        this.products = [];
        this.id = 1;
        this.path = filename;
    }

    getProducts () {
        // verifico si los productos existen en los archivos y en tal caso los vuelvo objetos
        if( fs.existsSync(this.path)) {
            const contenido = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            return contenido 
        }
        // en tal caso de que los productos no existan inicializo el array
        return this.products
    }

    getProductById(id) {
        //obtengo los productos desde los archivos y busco si existe tal id
        const productos = this.getProducts()
        const product= productos.find( p => p.id === id )

        if (product) return console.log('Producto encontrado', product)
        return console.log("Error: Producto no encontrado en los archivos")
    }

    async addProduct(product){
        const productos = this.getProducts()
        if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code | !product.stock  ) {
            console.log("Todos los campos son obligatorios")
            return
        }

        const existProduct = productos.find( p => p.code === product.code )

        if (existProduct) {
            console.log("El codigo de producto ya existe")
            return
        }

        const newProduct = {
            ...product,
            id: this.id
        };
        productos.push(newProduct)
        this.id++
        await fs.writeFileSync(this.path, JSON.stringify(productos, null,  '\t'))
        console.log("Nuevo producto agregado", newProduct)
    }

    //Actualizo valores de un producto del campo segun la key ingresada
    updateProduct (id, key, value ) {
        const productos = this.getProducts()
        // Busco el producto por ID
        let item = productos.find( el => (el.id === id))
        // Verifico el campo sea el mismo para poder actualizar
        if (item && item.hasOwnProperty(key)){
            item[key]= value
            fs.writeFileSync(this.path, JSON.stringify(productos, null,'\t' ))
            console.log('Producto actualizado')
        } else console.log('No se encontraron los datos para actualizar')
    }

    // Actualizo y creo el producto con los campos nuevos ingresados
    async addUpdateProduct (product){
        const productos = this.getProducts()
        
        if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code | !product.stock || !product.status || !product.category ) {
            console.log("Todos los campos son obligatorios2")
            return
        }

        const existProduct = productos.find( p => p.code === product.code )

        if (existProduct) {
            console.log("El codigo de producto ya existe")
            return
        }
        
        const newProduct = {
            ...product,
            id:this.id++
        };
        
        productos.push(newProduct)
        
        
        await fs.writeFileSync(this.path, JSON.stringify(productos, null,  '\t'))
        console.log("Nuevo producto agregado", newProduct)
    }

    async deleteProduct (id)  {
        const productos= this.getProducts()
        // Busco el ID para luego poder borrarlo 
        const productoIndex = productos.findIndex( (item) => item.id === id )
        console.log('DELETEPRODUCT',productoIndex)
        if (productoIndex === -1) return console.log('Error: No existe ningun elemento con ese ID')
        //Borro y actualizo en los archivos 
        productos.splice(productoIndex, 1)
        await fs.writeFileSync(this.path, JSON.stringify(productos, null, '\t'))
        console.log('Producto borrado exitosamente')
    }



}

const manager = new productManager();

export default manager

// manager.addProduct({
//     title: "producto prueba",
//     description:"Este es un producto prueba",
//     price:200,
//     thumbnail:"Sin imagen",
//     code:"abc123",
//     stock:25
// })

// manager.addProduct({
//     title: "producto prueba2",
//     description:"Este es un producto prueba2",
//     price:2002,
//     thumbnail:"Sin imagen2",
//     code:"abc1232",
//     stock:252
// })

// manager.addProduct({
//     title: "producto prueba3",
//     description:"Este es un producto prueba3",
//     price:2003,
//     thumbnail:"Sin imagen3",
//     code:"abc12323",
//     stock:2523
// })

// manager.getProductById(3)

// manager.updateProduct(1, 'stock', 100)

// console.log(manager.getProducts());


