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
exports.start = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const domainInfoModel_1 = __importDefault(require("../models/domainInfoModel"));
const scanProcess_1 = require("./scanProcess");
const MONTH = '* * 1 * *';
const TEN_SECONDS = '*/10 * * * * *'; //10 seconds for testingÍ
function start() {
    node_cron_1.default.schedule(MONTH, () => __awaiter(this, void 0, void 0, function* () {
        try {
            const unscannedDomains = yield domainInfoModel_1.default.find({ scanned: false });
            unscannedDomains.forEach((domain) => __awaiter(this, void 0, void 0, function* () {
                const scanner = new scanProcess_1.DomainScanner(domain);
                yield scanner.scanDomain();
            }));
            console.log('There are no domains to scan!');
        }
        catch (error) {
            console.error('Error during scanning:', error);
        }
    }));
}
exports.start = start;
