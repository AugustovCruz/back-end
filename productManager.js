class productManager {

    constructor() {
        this.products = [];
        this.id = 1;
    }

    getProducts () {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find( p => p.id === id)
        if (product) return console.log('producto encontrado', product)
        return console.log("Not found")
    }

    addProduct(product){
        if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code | !product.stock  ) {
            console.log("Todos los campos son obligatorios")
            return
        }

        const existProduct = this.products.find( p => p.code === product.code )

        if (existProduct) {
            console.log("El codigo de producto ya existe")
            return
        }

        const newProduct = {
            ...product,
            id: this.id
        };
        this.products.push(newProduct)
        this.id++

        console.log("Nuevo producto agregado", newProduct)
    }
}

const manager = new productManager();

console.log(manager.getProducts());



manager.addProduct({
    title: "producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
})

manager.addProduct({
    title: "producto prueba2",
    description:"Este es un producto prueba2",
    price:2002,
    thumbnail:"Sin imagen2",
    code:"abc1232",
    stock:252
})

manager.getProductById(2)