const { default: mongoose } = require('mongoose')
const Product = require('../models/product');

const productRepository = {
    findAll: () => {
        return Product.find();
    },
    findById: (id) => {
        if(id) {
            return Product.findById({_id: id});
        } else {
            throw new Error("Id not provided");
        }
    },
    save: (product) => {
        if(product) {
            var product = new Product({
                name: product.name,
                price: product.price,
                availableQuantity: product.availableQuantity,
                minPurchasableQuantity: product.minPurchasableQuantity,
                maxPurchasableQuantity: product.maxPurchasableQuantity
            })
            return product.save();
        } else {
            throw new Error("Invalid product");
        }
    },
    update: (id, product) => {
        if(!id) {
            throw new Error("Empty id");
        }
        if(product) {
            var name = product.name;
            var price = product.price;
            var availableQuantity = product.availableQuantity;
            var minPurchasableQuantity = product.minPurchasableQuantity;
            var maxPurchasableQuantity = product.maxPurchasableQuantity;
            return Product.findByIdAndUpdate({_id: id}, {name, price, availableQuantity, minPurchasableQuantity, maxPurchasableQuantity});
        } else {
            throw new Error("Invalid product");
        }
    },
    delete: (id) => {
        if(!id) {
            throw new Error("Empty id");
        } else {
            return Product.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        }
    }
  }
  
  module.exports = productRepository;