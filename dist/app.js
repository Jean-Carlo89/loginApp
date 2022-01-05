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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
exports.app = app;
// const port = process.env.PORT || 3000
const port = 3000;
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const database = database_1.connectionexport;
    //const myarray  = await database.db().listCollections().toArray()
    const x = yield database.db("users").collection("usersInfo").findOne();
    console.log(x);
    res.send(x);
}));
app.get("/test", (req, res) => {
    res.send("test route");
});
const server = app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(port);
    yield (0, database_1.connectToMongoDb)();
    //console.log(app.locals.bd())
    process.on('SIGINT', () => {
        server.close();
        console.log("Server closed");
    });
    console.log(`Listening on ${port}`);
}));
//# sourceMappingURL=app.js.map