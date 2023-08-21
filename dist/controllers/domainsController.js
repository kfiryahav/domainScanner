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
const domainInfoModel_1 = __importDefault(require("../models/domainInfoModel"));
const getDomainInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const domain = req.params.domain;
    domainInfoModel_1.default.findOne({ domain: domain })
        .then((foundDocument) => {
        if (foundDocument !== null) { // Check for null
            if (!foundDocument.scanned) {
                return res.json({ message: 'Not found please check back later.' });
            }
            return res.json({ foundDocument: foundDocument });
        }
        else {
            domainInfoModel_1.default.create({
                domain: domain
            });
            return res.json({ message: 'Not found please check back later.' });
        }
    })
        .catch(error => {
        console.error("Error finding document:", error);
    });
});
const addDomainToList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const domain = req.body.domain;
    try {
        const newDomainCreation = yield domainInfoModel_1.default.create({ domain: domain });
        return res.status(201).json({ newDomainCreation: newDomainCreation });
    }
    catch (error) {
        console.error('Error', error);
        return res.status(500).json({ error: `Internal server error :${error}` }); // Send a generic error response
    }
});
exports.default = {
    getDomainInformation,
    addDomainToList
};
