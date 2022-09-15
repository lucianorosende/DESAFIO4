import { products } from "./index.js";

class Contenedor {
    save(obj) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].id === undefined) {
                obj[i].id = i;
                products.push(obj[i]);
            }
        }
        return products;
    }
    getAll() {
        return products;
    }
    getById(num) {
        let findProduct = products.find((product) => product.id == num);
        if (findProduct === undefined)
            return `no existe ningun producto para el valor que deseas`;
        return findProduct;
    }
}

export default Contenedor;
