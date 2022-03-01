const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./TypeDefs");
const { resolvers } = require("./resolvers");

const { connectDB } = require("./db");

const dotenv = require("dotenv")

const app = express();

dotenv.config();
const { PORT, MONGODB_URI } = process.env;

connectDB(MONGODB_URI);


app.get("/", (req, res) => res.send("Welcome to my api"));

module.exports = app;

async function  start(){

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers    
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.use("*", (req,res) => res.status(404).send("Not found"));

    app.listen(PORT, () => {
        console.log("Server on port", PORT);
    });
}

start();