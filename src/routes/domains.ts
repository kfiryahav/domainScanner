import express from 'express';
const router = express.Router();
import domainsController from '../controllers/domainsController';
import { validateGetDomainInput, validatePostDomainInput } from '../middlewares/inputValidation';

router.get('/:domain', validateGetDomainInput, domainsController.getDomainInformation);

router.post('/', validatePostDomainInput, domainsController.addDomainToList);

export default router;
