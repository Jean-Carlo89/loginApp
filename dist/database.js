"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDb = exports.connectionexport = void 0;
const mongodb_1 = require("mongodb");
let connectionexport;
exports.connectionexport = connectionexport;
const connectToMongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient("mongodb://root:root@db:27017/");
    try {
        const connection = yield client.connect();
        //const x = connection.db("users")
        // app.locals.bd = x
        console.log(`connected to db ${connection.db("users").databaseName}`);
        exports.connectionexport = connectionexport = connection;
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield connection.close();
                console.log("connection to db closed");
            }
            catch (e) {
                console.log(e);
            }
        }));
    }
    catch (e) {
        console.log(e);
    }
});
exports.connectToMongoDb = connectToMongoDb;
//# sourceMappingURL=database.js.map