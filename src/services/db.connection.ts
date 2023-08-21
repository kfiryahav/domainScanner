import mongoose from 'mongoose';
require('dotenv').config();

const connectionString: string | undefined = process.env.MONGODB_URI;

// Check if the connectionString is defined before using it
if (connectionString) {
    mongoose.connect(connectionString);
} else {
    console.error('MongoDB connection string not defined.');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(' mongoDB cloud is connected!');
});

export default db;
