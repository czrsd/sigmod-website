import { Document, Model, Schema, models, model } from 'mongoose';

export interface IViewLogData {
    identifier: string;
    createdAt: Date;
}

export interface IViewLog extends IViewLogData, Document {}

const ViewLogSchema = new Schema<IViewLog>({
    identifier: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: 259200 },
});

const ViewLogModel: Model<IViewLog> =
    models.ViewLog || model<IViewLog>('ViewLog', ViewLogSchema);
export default ViewLogModel;
