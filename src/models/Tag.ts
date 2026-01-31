import mongoose, { Document, Model, Schema, models, model } from 'mongoose';

export interface ITag extends Document {
    name: string;
    slug: string;
    color: string;
    description?: string;
}

const TagSchema = new Schema<ITag>({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    color: { type: String, default: '#5865F2' },
    description: { type: String },
});

const TagModel: Model<ITag> = models.Tag || model<ITag>('Tag', TagSchema);
export default TagModel;
