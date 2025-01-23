const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose')
const schema = require('./graphQlSchema') 

const mongoUrl = "mongodb://localhost:27017/products" ;

mongoose.connect(mongoUrl)
.then(()=> console.log('Connected to mongodb'))
.catch(err => console.log('Mongodb connection error:' , err));

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
})

server.listen({port:9000}).then(({url})=> {
    console.log(`Server running at ${url}`);
})