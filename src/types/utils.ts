import mongoose from 'mongoose';

export type Serializable<T> = {
    [K in keyof T]: T[K] extends mongoose.Types.ObjectId
        ? string
        : T[K] extends Date
        ? string
        : T[K] extends object
        ? Serializable<T[K]>
        : T[K];
};
