import cron from 'node-cron';
import DomainInfoModel from "../models/domainInfoModel";
import { DomainScanner } from "./scanProcess";

const MONTH: string = '* * 1 * *';
const TEN_SECONDS: string = '*/10 * * * * *'; //10 seconds for testingÍ

export function start() {
    cron.schedule(MONTH, async () => {
        type ApiData = Record<string, unknown>[]; // Define ApiData as an array of objects

        interface DomainDocument {
            domain: string;
            virusTotal: ApiData[];
            whoIs: ApiData[];
            scanned: boolean;
        }

        try {
            const unscannedDomains: DomainDocument[] = await DomainInfoModel.find({ scanned: false });

            unscannedDomains.forEach(async (domain) => {
                const scanner = new DomainScanner(domain);
                await scanner.scanDomain();
            });
            console.log('There are no domains to scan!');

        } catch (error) {
            console.error('Error during scanning:', error);
        }
    });
}
