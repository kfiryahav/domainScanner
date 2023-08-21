"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const connectionString = process.env.MONGODB_URI;
// Check if the connectionString is defined before using it
if (connectionString) {
    mongoose_1.default.connect(connectionString);
}
else {
    console.error('MongoDB connection string not defined.');
}
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(' mongoDB cloud is connected!');
});
exports.default = db;
