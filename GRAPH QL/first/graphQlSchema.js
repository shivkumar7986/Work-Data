const { gql } = require('apollo-server-express');
const ProductModel = require('./models/productModel');

// GraphQL Type Definitions
exports.typeDefs = gql`
  type Product {
    id: ID
    category: String
    productName: String
    price: Int!
    colors: [String!]
    imgPath: String
  }

  type Query {
    getProductsList: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    updateProduct(
      id: ID!
      category: String!
      productName: String!
      price: Int!
      colors: [String!]
      imgPath: String!
    ): Product
    addProduct(
      category: String
      productName: String!
      price: Int
      colors: [String!]
      imgPath: String
    ): Product
    deleteProduct(id: ID!): Boolean!
  }
`;

// GraphQL Resolvers
exports.resolvers = {
  Query: {
    getProductsList: async () => {
      try {
        return await ProductModel.find();
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Could not fetch products");
      }
    },
    getProduct: async (parent, args) => {
      try {
        return await ProductModel.findById(args.id);
      } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Could not fetch product");
      }
    },
  },

  Mutation: {
    updateProduct: async (parent, args) => {
      try {
        return await ProductModel.findByIdAndUpdate(
          args.id,
          {
            productName: args.productName,
            category: args.category,
            price: args.price,
            imgPath: args.imgPath,
            colors: args.colors,
          },
          { new: true }
        );
      } catch (error) {
        console.error("Error updating product:", error);
        throw new Error("Could not update product");
      }
    },
    addProduct: async (parent, args) => {
      if (!args.productName || args.price == null) {
        throw new Error("Product name and price are required");
      }
      try {
        const product = new ProductModel(args);
        return await product.save();
      } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Could not add product");
      }
    },
    deleteProduct: async (parent, args) => {
      try {
        await ProductModel.findOneAndDelete({ _id: args.id });
        return true;
      } catch (error) {
        console.error("Error deleting product:", error);
        return false;
      }
    },
  },
};
