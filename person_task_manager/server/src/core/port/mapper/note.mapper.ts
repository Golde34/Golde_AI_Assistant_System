import { isStringEmpty } from "../../../kernel/util/string-utils";
import { INoteEntity } from "../../domain/entities/note.entity";
import { ActiveStatus, EventStatus } from "../../domain/enums/enums";

export const createNoteMapper = (note: INoteEntity) => {
    isStringEmpty(note.name) ? note.name = convertNewDateToName() : note.name;
    note.isLock === null ? note.isLock = false : note.isLock;
    isStringEmpty(note.activeStatus) ? note.activeStatus = ActiveStatus.active : note.activeStatus;
    note.createdAt = new Date();
    note.updatedAt = new Date();
    isStringEmpty(note.fileStatus) ? note.fileStatus = EventStatus.INIT : note.fileStatus;
    return note;
}

const convertNewDateToName = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const noteMapper = {
    buildUploadFileKafkaMessage(fileId: string, fileName: string) {
        return {
            "fileId": fileId,
            "fileName": fileName
        }
    },

    createNoteMapper(note: INoteEntity): INoteEntity {
        isStringEmpty(note.name) ? note.name = convertNewDateToName() : note.name;
        note.isLock === null ? note.isLock = false : note.isLock;
        isStringEmpty(note.activeStatus) ? note.activeStatus = ActiveStatus.active : note.activeStatus;
        note.createdAt = new Date();
        note.updatedAt = new Date();
        isStringEmpty(note.fileStatus) ? note.fileStatus = EventStatus.INIT : note.fileStatus;
        return note;
    }
}


