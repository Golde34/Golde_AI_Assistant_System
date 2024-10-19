import mongoose, { Schema } from "mongoose";
import { INoteEntity } from "../../../core/domain/entities/note.entity";
import { ActiveStatus } from "../../../core/domain/enums/enums";

export const noteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        fileLocation: {
            type: String,
            required: false,
        },
        tag: {
            type: Schema.Types.ObjectId,
            ref: 'UserTag',
            required: false,
        },
        activeStatus: {
            type: String,
            enum: Object.values(ActiveStatus),
            default: ActiveStatus.active,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

noteSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const NoteEntity = mongoose.model<INoteEntity>("Note", noteSchema);