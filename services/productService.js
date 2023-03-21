const productRepository = require('../repositories/productRepository');

const productService = {
    findAll: () => {
        return productRepository.findAll();
    },
    findById: (id) => {
        if(!id) {
            throw new Error("Id not provided");
        }

        return productRepository.findById(id);
    },
    save: (product) => {
        if(!product) {
            throw new Error("Empty product");
        }
        if(!product.name) {
            throw new Error("Name not specified");
        }
        if(!product.price) {
            throw new Error("Price not specified");
        }
        if(!product.availableQuantity) {
            throw new Error("Available quantity not specified");
        }
        if(!product.minPurchasableQuantity) {
            throw new Error("Min Purchasable Quantity not specified");
        }
        if(!product.maxPurchasableQuantity) {
            throw new Error("Max Purchasable Quantity not specified");
        }

        return productRepository.save(product);
    },
    update: (id, product) => {
        if(!id) {
            throw new Error("Empty id");
        }
        if(!product) {
            throw new Error("Empty product");
        }
        console.log(product);
        if(!product.name && !product.price && !product.availableQuantity && !product.minPurchasableQuantity && !product.maxPurchasableQuantity) {
            throw new Error("No field to update");
        }

        return productRepository.update(id, product);
    },
    delete: (id) => {
        if(!id) {
            throw new Error("Id not provided");
        }
        
        return productRepository.delete(id);
    },
    subQuantity: async (id, quantity) => {
        if(!id) {
            throw new Error("Empty id");
        }
        if(!quantity) {
            throw new Error("Empty quantity");
        }
        var product = await module.exports.findById(id);
        var availableQuantity = product.availableQuantity - quantity;
        var toUpdate = {
            availableQuantity: availableQuantity
        };
        await module.exports.update(id, toUpdate);
    }
  }
  
  module.exports = productService;