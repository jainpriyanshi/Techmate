module.exports = {
    mongoURI: process.env.MONGOURI || "mongodb://localhost:27017",
    secretOrKey: process.env.SECRET || "secret"
    };