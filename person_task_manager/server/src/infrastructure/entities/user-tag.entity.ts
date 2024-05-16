import mongoose from "mongoose";
import { ActiveStatus } from "../../core/domain/enums/enums";

export interface IUserTagEntity extends Document {
    _id: string;
    name: string;
    color: string;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
    activeStatus: ActiveStatus;
    ownerId: number;
}

export const userTagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            required: false,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
        activeStatus: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

userTagSchema.virtual("id").get(function () {
    return this.id.toString();
});

export const UserTagEntity = mongoose.model<IUserTagEntity>("UserTag", userTagSchema);