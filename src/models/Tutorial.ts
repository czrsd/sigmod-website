import mongoose, { Document, Model, Schema, models, model } from 'mongoose';
import { ITag } from './Tag';

export interface ITutorial extends Document {
    title: string;
    description: string;
    type: 'youtube' | 'video' | 'image';
    contentUrls: string[];
    thumbnailUrl?: string;
    authorId: string;
    tags: mongoose.Types.ObjectId[] | ITag[];
    status: 'pending' | 'approved' | 'rejected';

    duration: number;

    likes: number;
    views: number;

    createdAt: Date;
    updatedAt: Date;
}

const TutorialSchema = new Schema<ITutorial>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        type: {
            type: String,
            enum: ['youtube', 'video', 'image'],
            required: true,
        },
        contentUrls: [{ type: String, required: true }],
        authorId: { type: String, required: true },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        duration: { type: Number, default: 0 },

        likes: [{ type: String }],
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const TutorialModel: Model<ITutorial> =
    models.Tutorial || model<ITutorial>('Tutorial', TutorialSchema);
export default TutorialModel;
