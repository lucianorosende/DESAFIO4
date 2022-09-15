import Express from "express";

export const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
const port = 8080;

// Levanta el server
app.listen(port, () => {
    console.log("server up");
});

app.use("/api/productos/archivos", Express.static("public"));
