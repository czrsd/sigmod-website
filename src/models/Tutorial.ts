import mongoose, { Document, Model, Schema, models, model } from 'mongoose';
import { ITag } from './Tag';

export interface ITutorialData {
    _id: string;
    slug: string;
    title: string;
    description: string;
    type: 'youtube' | 'video' | 'images';
    contentUrls: string[];
    thumbnailUrl?: string;
    authorId: string;
    tags: ITag[];
    status: 'pending' | 'approved' | 'rejected';
    duration: number;
    likes: string[];
    views: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface ITutorialPopulated extends Omit<ITutorialData, 'authorId'> {
    authorId: {
        _id: string;
        name: string;
        image: string;
        role?: string;
    };
}

export interface ITutorial
    extends Omit<ITutorialData, '_id' | 'tags'>,
        Document {
    tags: mongoose.Types.ObjectId[] | ITag[];
}

const TutorialSchema = new Schema<ITutorial>(
    {
        title: { type: String, required: true, trim: true },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: { type: String, required: true },
        type: {
            type: String,
            enum: ['youtube', 'video', 'images'],
            required: true,
        },
        contentUrls: [{ type: String, required: true }],
        authorId: { type: String, required: true },
        thumbnailUrl: { type: String },
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
