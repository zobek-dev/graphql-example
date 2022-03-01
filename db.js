const { connect } = require("mongoose");

const connectDB = async (URI) => {
    console.log(URI)
    try {
        await connect(URI);
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error)
    }
};

module.exports = { connectDB };