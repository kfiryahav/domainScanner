import { Request, Response } from 'express';
import DomainInfoModel from '../models/domainInfoModel';
import { Document } from 'mongoose';

const getDomainInformation = async (req: Request, res: Response) => {
     const domain: string = req.params.domain;
    // Define the expected types for the document and the result of findOne
    interface DomainInfoDocument extends Document {
        domain: string;
        virusTotal: object[];
        whoIs: object[];
        scanned: boolean;
    }

    DomainInfoModel.findOne<DomainInfoDocument>({ domain: domain })
        .then((foundDocument: DomainInfoDocument | null) => {
            if (foundDocument !== null) { // Check for null
                if (!foundDocument.scanned) {
                    return res.json({ message: 'Not found please check back later.' });
                }
                return res.json({ foundDocument: foundDocument })
            } else {
                DomainInfoModel.create({
                    domain: domain
                });
                return res.json({ message: 'Not found please check back later.' });
            }
        })
        .catch(error => {
            console.error("Error finding document:", error);
        });
}

const addDomainToList = async (req: Request, res: Response) => {
    const domain: string = req.body.domain;

    try {
        const newDomainCreation = await DomainInfoModel.create({ domain: domain });
        return res.status(201).json({ newDomainCreation: newDomainCreation });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ error: `Internal server error :${error}` }); // Send a generic error response
    }
};


export default {
    getDomainInformation,
    addDomainToList
}