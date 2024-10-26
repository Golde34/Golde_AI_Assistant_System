import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response-helpers";
import { CREATE_NOTE_FAILED, NOTE_EXISTED, NOTE_NOT_FOUND, NOTE_PASSWORD_INCORRECT } from "../domain/constants/error.constant";
import { noteService } from "../services/note.service";

class NoteUsecase {
    constructor() { }

    async getAllNotes(userId: number): Promise<IResponse> {
        try {
            const notes = await noteService.getAllNotes(userId);
            if (!notes) {
                return msg400(NOTE_NOT_FOUND);
            }
            return msg200({
                message: (notes as any)
            });
        } catch (error) {
            return msg400(NOTE_NOT_FOUND);
        }
    }


    async createNote(note: any): Promise<IResponse> {
        try {
            const existedNote = await noteService.getNoteById(note._id);
            if (existedNote) {
                return msg400(NOTE_EXISTED);
            }
            const newNote = await noteService.createNote(note);
            await noteService.pushKafkaUploadFileToDataStorage(newNote._id.toString(), note.fileId, note.fileName);
            return msg200({
                message: (newNote as any)
            })
        } catch (error) {
            console.log(error);
            return msg400(CREATE_NOTE_FAILED);
        }
    }

    async updateNoteFileStatus(fileLocation: string, noteId: string): Promise<IResponse> {
        try {
            const note = await noteService.getNoteById(noteId);
            if (!note) {
                return msg400(NOTE_NOT_FOUND);
            }
            const updatedNote = await noteService.updateNoteFileStatus(note, fileLocation);
            return msg200({
                message: (updatedNote as any)
            })
        } catch (error) {
            return msg400(NOTE_NOT_FOUND);
        }
    }

    async updateNoteById(noteId: string, noteName: any): Promise<IResponse> {
        try {
            const note = await noteService.getNoteById(noteId);
            if (!note) {
                return msg400(NOTE_NOT_FOUND);
            }
            if (note._id !== noteId) {
                return msg400(NOTE_NOT_FOUND);
            }
            note.name = noteName;
            const updatedNote = await noteService.updateNote(note);
            return msg200({
                message: (updatedNote as any)
            })
        } catch (error) {
            throw new Error('Note not found');
        }
    }

    async getNoteById(noteId: string): Promise<IResponse> {
        try {
            const note = await noteService.getNoteById(noteId);
            if (!note) {
                return msg400(NOTE_NOT_FOUND);
            }
            return msg200({
                message: (note as any)
            })
        } catch (error) {
            return msg400(NOTE_NOT_FOUND);
        }
    }

    async lockNoteById(lockNoteRequest: any): Promise<IResponse> {
        try {
            const note = await noteService.getNoteById(lockNoteRequest.noteId);
            if (!note) {
                return msg400(NOTE_NOT_FOUND);
            }
            await noteService.lockNote(note, lockNoteRequest.notePassword, lockNoteRequest.passwordSuggestion);
            return msg200({
                message: (note as any)
            })
        } catch (error) {
            return msg400(NOTE_NOT_FOUND);
        }
    }

    async unlockNoteById(unlockNoteRequest: any): Promise<IResponse> {
        try {
            console.log(unlockNoteRequest);
            const note = await noteService.getNoteByIdAndPassword(unlockNoteRequest);
            if (!note) {
                return msg400(NOTE_PASSWORD_INCORRECT);
            }
            await noteService.unlockNote(note);
            return msg200({
                message: (note as any)
            })
        } catch (error) {
            return msg400(NOTE_NOT_FOUND);
        }
    }

    async deleteNoteById(noteId: string): Promise<IResponse> {
        try {
            const note = await noteService.getNoteById(noteId);
            if (!note) {
                return msg400(NOTE_NOT_FOUND);
            }
            await noteService.deleteNoteById(note, noteId);
            return msg200({
                message: "Note deleted"
            })
        } catch (error) {
            return msg400(NOTE_NOT_FOUND);
        }
    }
}

export const noteUsecase = new NoteUsecase();