import { Document, Model, Schema, models, model } from 'mongoose';

export interface ITagData {
    _id: string;
    name: string;
    slug: string;
    color: string;
    description?: string;
}

export interface ITag extends Omit<ITagData, '_id'>, Document {}

const TagSchema = new Schema<ITag>({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    color: { type: String, default: '#5865F2' },
    description: { type: String },
});

const TagModel: Model<ITag> = models.Tag || model<ITag>('Tag', TagSchema);
export default TagModel;
