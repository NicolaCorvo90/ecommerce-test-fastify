const uuid = require('uuid');
const Product = require('../models/product');

const productRepository = {
    findAll: async () => {
        return await Product.scan().exec();
    },
    findById: async (id) => {
        if(id) {
            var product = await Product.get(id);
            if(product == null) {
                throw new Error("Product not found.");
            }
            return product;
        } else {
            throw new Error("Id not provided");
        }
    },
    save: async (product) => {
        if(product) {
            var product = new Product({
                id: uuid.v4(),
                name: product.name,
                price: product.price,
                availableQuantity: product.availableQuantity,
                minPurchasableQuantity: product.minPurchasableQuantity,
                maxPurchasableQuantity: product.maxPurchasableQuantity
            })
            return await product.save();
        } else {
            throw new Error("Invalid product");
        }
    },
    update: async (id, product) => {
        if(!id) {
            throw new Error("Empty id");
        }
        if(product) {
            var oldRecord = await Product.get(id);
            
            var toSave = new Product({
                id: oldRecord.id,
                name: oldRecord.name,
                price: oldRecord.price,
                availableQuantity: oldRecord.availableQuantity,
                minPurchasableQuantity: oldRecord.minPurchasableQuantity,
                maxPurchasableQuantity: oldRecord.maxPurchasableQuantity
            });

            if(product.name) {
                toSave.name = product.name;
            }
            if(product.price) {
                toSave.price = product.price;
            }
            if(product.availableQuantity) {
                toSave.availableQuantity = product.availableQuantity;
            }
            if(product.minPurchasableQuantity) {
                toSave.minPurchasableQuantity = product.minPurchasableQuantity;
            }

            if(product.maxPurchasableQuantity) {
                toSave.maxPurchasableQuantity = product.maxPurchasableQuantity;
            }

            return await toSave.save();
        } else {
            throw new Error("Invalid product");
        }
    },
    delete: async (id) => {
        if(!id) {
            throw new Error("Empty id");
        } else {
            return await Product.delete(id);
        }
    }
  }
  
  module.exports = productRepository;