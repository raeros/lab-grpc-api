// importing requirements
const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

// knex (query builder)
const env = process.env.ENV || "development";
const config = require("./knexfile.js")[env];
const knex = require("knex")(config);

// grpc service definition
const productProtoPath = path.join(__dirname, "..", "protos", "product.proto");
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;

// knex queries
function listProducts(call, callback) {
    knex('products')
        .then((data) => { callback(null, { products: data }); });
}

function readProduct(call, callback) {
    knex('products')
        .where({ id: parseInt(call.request.id) })
        .then((data) => {
            if (data.length) {
                callback(null, data[0]);
            } else {
                // error handling docs https://www.grpc.io/docs/guides/error/
                // example in node https://github.com/avinassh/grpc-errors/tree/master/node
                callback({
                    code: grpc.status.GRPC_STATUS_UNKNOWN,
                    message: "That product does not exist."
                });
            }
        });

}

function createProduct(call, callback) {
    knex("products")
        .insert({
            name: call.request.name,
            price: call.request.price
        }).then(() => { callback(null, { status: "success" }); });

}

function updateProduct(call, callback) {

    knex("products")
        .where({ id: parseInt(call.request.id) })
        .update({
            name: call.request.name,
            price: call.request.price
        })
        .returning()
        .then((data) => {
            if (data) {
                callback(null, { status: "success" });
            } else {
                callback({
                    code: grpc.status.GRPC_STATUS_UNKNOWN,
                    message: "That product does not exist."
                });
            }
        });
}

function deleteProduct(call, callback) {
    knex("products")
        .where({ id: call.request.id })
        .delete()
        .returning()
        .then((data) => {
            if (data) {
                callback(null, { status: "success" });
            } else {
                callback({
                    code: grpc.status.GRPC_STATUS_UNKNOWN,
                    message: "That product does not exist."
                });
            }
        });
}

// main
function main() {
    // gRPC server instance
    const server = new grpc.Server();
    //gRPC Service
    server.addService(productPackageDefinition.ProductService.service, {
        listProducts: listProducts,
        readProduct: readProduct,
        createProduct: createProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct
    });

    // gRPC server
    server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("gRPC server running at http://127.0.0.1:50051");
}

main();
