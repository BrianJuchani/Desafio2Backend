
const { promises } = require('dns');
const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './products.json'; 
        this.itemId = 1;
    }

    async addProduct(ProductInf) {
        try {
            let productos = [];
            
            try{
                productos = await this.getProducts();
            } catch (error) {
                productos = [];
            }

            const product = {
                id: this.itemId++,
                title: ProductInf.title,
                description: ProductInf.description,
                price: ProductInf.price,
                thumbnail: ProductInf.thumbnail,
                code: ProductInf.code,
                stock: ProductInf.stock
            };

            productos.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(productos));
        } catch (error) {
            console.error(error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id){
        const buscardor= await fs.promises.readFile(this.path, 'utf-8')
        const buscar =await JSON.parse(buscardor)
        const encontrado=await buscar.find((itemID)=>itemID.id===id)
        if(buscardor){
            console.log('----------ID encontrado--------------')
            console.log(encontrado)
        }else{
            console.log('not found'+ id)
        }

    }
    async getDeleteProduct(DeleteId){
        let productos=await this.getProducts()
        const eliminado=productos.find((deleteid)=>deleteid.id===DeleteId)
        if(eliminado !== -1){
            productos.splice(eliminado,1)
            await fs.promises.writeFile(this.path ,JSON.stringify(productos));
            console.log('-----delet -----',eliminado)
        }else{
            console.log('producto encontrado para borrar')
        }
    }
    async updateProduct(id, updateProducts) {
        let productos = await this.getProducts();
        const modi = productos.findIndex((produc) => produc.id === id);
    
        if (modi !== -1) {
            productos[modi] = {
                id: id,
                ...updateProducts
            };
            await fs.promises.writeFile(this.path, JSON.stringify(productos));
            console.log('Producto encontrado');
        } else {
            console.log('no se ecnontro');
        }
    }

}

const productManager = new ProductManager();

const ProductInf = {
    title: 'BJ',
    description: 'Ropa En Mayoria',
    price: 3000,
    thumbnail: 'Img',
    code: 1,
    stock: 30
};

const ProductInf2 = {
    title: 'MF',
    description: 'Ropa En Menoria',
    price: 4500,
    thumbnail: 'Img2',
    code: 2,
    stock: 32
};

const test = async () => {
    await productManager.addProduct(ProductInf);
    await productManager.addProduct(ProductInf2);

    const products = await productManager.getProducts();
    console.log(products);

    await productManager.getProductById(1)
    await productManager.getProductById(2)


    await productManager.getDeleteProduct(1)
    await productManager.getDeleteProduct(2)

    const updatedProductModi={
        title:'nuevo',
        description:'nuevos',
        price:200,
        thumbnail:'nuevo img',
        code:3,
        stock:34
    }
    await productManager.updateProduct(1,updatedProductModi)

};

test();

