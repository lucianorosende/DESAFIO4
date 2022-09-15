const express = require("express");
let products = [];
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 8080;

// Levanta el server
app.listen(port, () => {
    console.log("server up");
});

app.use("/api/productos/archivos", express.static("public"));

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
const Container = new Contenedor();

const Save = () => {
    Container.save([
        // Guarda El array y le da un id a cada uno
        {
            title: "Auto",
            price: 200,
            thumbnail:
                "https://www.karvi.com.ar/blog/wp-content/uploads/2020/10/208II3-850x567.jpg",
        },
        {
            title: "Moto",
            price: 400,
            thumbnail:
                "https://www.moto1pro.com/sites/default/files/yamaha-yzf-r3.jpg",
        },
        {
            title: "Camion",
            price: 600,
            thumbnail:
                "https://img.remediosdigitales.com/5130e4/mercedes-benz-genh2-truck-05/1366_2000.jpeg",
        },
        {
            title: "Avion",
            price: 1000,
            thumbnail:
                "https://i.blogs.es/939f7b/the-fly-zero-concept-1_w/1366_2000.png",
        },
    ]);
};

Save();

//Router
const apiRouter = express.Router();

// get Products
apiRouter.get("/", (req, res) => {
    let products = Container.getAll();
    res.json({ products });
});

// get Products based off id
apiRouter.get("/:id", (req, res) => {
    let product = Container.getById(req.params.id);
    res.json({ product });
});

// add products and add id
apiRouter.post("/", (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.description) {
        return res.send("completar todo el formulario");
    }
    let lastId = products[products.length - 1].id + 1;
    req.body.id = lastId;
    products.push(req.body);

    res.send(`producto agregado con el id: ${lastId}`);
});

// update product based off id
apiRouter.put("/:id", (req, res) => {
    let product = Container.getById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.id = parseInt(req.params.id);

    res.send(product);
});

// delete product based off id
apiRouter.delete("/:id", (req, res) => {
    let product = products.filter(
        (product) => product.id !== parseInt(req.params.id)
    );
    products = product;
    res.send(products);
    if (products[req.params.id] === undefined)
        return res.send(`no existe el producto con id: ${req.params.id}`);
});

app.use("/api/productos", apiRouter);
