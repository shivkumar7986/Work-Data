const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');
const {typeDefs , resolvers} = require('./empGraphQlSchema')

const mongoose_url = 'mongodb://localhost:27017/Employee' ;

mongoose.connect(mongoose_url)
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error(err))

const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers: resolvers
})

server.listen({port:9000}).then(({url}) =>{
    console.log(`server running at ${url}`);
})