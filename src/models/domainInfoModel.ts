import mongoose, { Document, Schema } from 'mongoose';

interface DomainInfo extends Document {
    domain: string;
    virusTotal: unknown[];
    whoIs: unknown[];
    scanned: boolean;
}

const domainInfoSchema = new Schema<DomainInfo>({
    domain: {
        type: String,
        required: true,
        unique: true
    },
    virusTotal: {
        type: [Object],
        default: []
    },
    whoIs: {
        type: [Object],
        default: []
    },
    scanned: {
        type: Boolean,
        default: false
    },
});

const DomainInfoModel = mongoose.model<DomainInfo>('domainInfo', domainInfoSchema);

export default DomainInfoModel;
