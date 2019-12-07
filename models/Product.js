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
    constructor(title) {
        this.title = title;
    }

    save() {
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
}