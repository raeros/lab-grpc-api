// importing requirements
const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

// gRPC client
const productProtoPath = path.join(__dirname, "..", "..", "protos", "product.proto");
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;
const client = new productPackageDefinition.ProductService(
    "localhost:50051", grpc.credentials.createInsecure()
);

// handlers
const listProducts = (req, res) => {
    client.listProducts({}, (err, result) => {
        res.json(result);
    });
};

const readProduct = (req, res) => {
    const payload = { id: parseInt(req.params.id) };

    client.readProduct(payload, (err, result) => {
        if (err) {
            console.log(err.message); // example in console: 5 NOT_FOUND: That product does not exist.
            res.json(err);
        } else {
            res.json(result);
        }
    });
};

const createProduct = (req, res) => {
    const payload = { name: req.body.name, price: req.body.price };

    client.createProduct(payload, (err, result) => {
        res.json(result);
    });
};

const updateProduct = (req, res) => {
    const payload = { id: parseInt(req.params.id), name: req.body.name, price: req.body.price };

    client.updateProduct(payload, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
};

const deleteProduct = (req, res) => {
    const payload = { id: parseInt(req.params.id) };

    client.deleteProduct(payload, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
};

module.exports = {
    listProducts,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
