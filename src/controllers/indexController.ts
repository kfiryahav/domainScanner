import { Request, Response } from 'express';
import DomainInfoModel from '../models/domainInfoModel';
import { DomainScanner } from '../services/scanProcess';

const getInitialMessage = async (req: Request, res: Response) => {
    return res.json({ message: 'koko moko' });

};

export default {
    getInitialMessage
};
