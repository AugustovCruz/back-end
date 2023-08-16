class productManager {

    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct(product){
        if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code | !product.stock  ) {
            console.log("Todos los campos son obligatorios")
            return
        }

        const existProduct = this.product.find( p => p.code === product.code )

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