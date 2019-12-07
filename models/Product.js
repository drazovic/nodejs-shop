const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');

const filePath = path.join(rootPath, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(data));
    });
}

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}