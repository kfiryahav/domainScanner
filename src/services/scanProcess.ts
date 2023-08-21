import axios, { AxiosResponse } from 'axios';
import DomainInfoModel from '../models/domainInfoModel';
require('dotenv').config();

type ApiData = Record<string, unknown>[]; // Define ApiData as an array of objects

interface DomainDocument {
    domain: string;
    virusTotal: ApiData[];
    whoIs: ApiData[];
    scanned: boolean;
}

export class DomainScanner {
    private domain: string;
    private virusTotal: ApiData[];
    private whoIs: ApiData[];
    private scanned: boolean;

    constructor(domainData: DomainDocument) {
        this.domain = domainData.domain;
        this.virusTotal = domainData.virusTotal;
        this.whoIs = domainData.whoIs;
        this.scanned = domainData.scanned;
    }

    public async scanDomain() {
        try {
            if (this.virusTotal.length === 0) {
                await this.fetchVirusTotalData();
                console.log(`virusTotal has been update on ${this.domain}`);
            }

            if (this.whoIs.length === 0) {
                await this.fetchWhoIsData();
                console.log(`whoIs has been update on ${this.domain}`);
            }

            if (this.whoIs.length !== 0 && this.virusTotal.length !== 0) {
                this.scanned = true;
                await DomainInfoModel.updateOne(
                    { domain: this.domain },
                    { scanned: this.scanned }
                );
                console.log(`${this.domain} has been update`);
            }
        } catch (error) {
            console.error('Error during scanning:', error);
        }
    }

    private async fetchVirusTotalData() {
        try {
            const apiKey = process.env.VIRUS_TOTAL_API_KEY;
            const response: AxiosResponse<ApiData> = await axios.get(
                `https://www.virustotal.com/api/v3/domains/${encodeURIComponent(this.domain)}`,
                {
                    headers: { 'x-apikey': apiKey },
                }
            );
            this.virusTotal = [response.data];
            await DomainInfoModel.findOneAndUpdate(
                { domain: this.domain },
                { virusTotal: this.virusTotal }
            );
        } catch (error: any) {
            console.error('Error fetching VirusTotal data:', error.message);
            throw error;
        }
    }

    private async fetchWhoIsData() {
        try {
            const apiKey = process.env.WHOIS_API_KEY;
            const response: AxiosResponse<ApiData> = await axios.get(
                `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${this.domain}&outputFormat=JSON&_hardRefresh=1`
            );
            this.whoIs = [response.data];
            await DomainInfoModel.findOneAndUpdate(
                { domain: this.domain },
                { whoIs: this.whoIs }
            );
        } catch (error: any) {
            console.error('Error fetching WhoIs data:', error.message);
            throw error;
        }
    }
}
