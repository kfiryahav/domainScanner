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
exports.DomainScanner = void 0;
const axios_1 = __importDefault(require("axios"));
const domainInfoModel_1 = __importDefault(require("../models/domainInfoModel"));
require('dotenv').config();
class DomainScanner {
    constructor(domainData) {
        this.domain = domainData.domain;
        this.virusTotal = domainData.virusTotal;
        this.whoIs = domainData.whoIs;
        this.scanned = domainData.scanned;
    }
    scanDomain() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.virusTotal.length === 0) {
                    yield this.fetchVirusTotalData();
                    console.log(`virusTotal has been update on ${this.domain}`);
                }
                if (this.whoIs.length === 0) {
                    yield this.fetchWhoIsData();
                    console.log(`whoIs has been update on ${this.domain}`);
                }
                if (this.whoIs.length !== 0 && this.virusTotal.length !== 0) {
                    this.scanned = true;
                    yield domainInfoModel_1.default.updateOne({ domain: this.domain }, { scanned: this.scanned });
                    console.log(`${this.domain} has been update`);
                }
            }
            catch (error) {
                console.error('Error during scanning:', error);
            }
        });
    }
    fetchVirusTotalData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = process.env.VIRUS_TOTAL_API_KEY;
                const response = yield axios_1.default.get(`https://www.virustotal.com/api/v3/domains/${encodeURIComponent(this.domain)}`, {
                    headers: { 'x-apikey': apiKey },
                });
                this.virusTotal = [response.data];
                yield domainInfoModel_1.default.findOneAndUpdate({ domain: this.domain }, { virusTotal: this.virusTotal });
            }
            catch (error) {
                console.error('Error fetching VirusTotal data:', error.message);
                throw error;
            }
        });
    }
    fetchWhoIsData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = process.env.WHOIS_API_KEY;
                const response = yield axios_1.default.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${this.domain}&outputFormat=JSON&_hardRefresh=1`);
                this.whoIs = [response.data];
                yield domainInfoModel_1.default.findOneAndUpdate({ domain: this.domain }, { whoIs: this.whoIs });
            }
            catch (error) {
                console.error('Error fetching WhoIs data:', error.message);
                throw error;
            }
        });
    }
}
exports.DomainScanner = DomainScanner;
