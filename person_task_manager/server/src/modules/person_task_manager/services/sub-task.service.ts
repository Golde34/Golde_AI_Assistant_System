import { IResponse } from "../../../common/response";
import { msg200 } from "../../../common/response_helpers";
import { SubTaskEntity } from "../entities/sub-task.entity";
import { TaskEntity } from "../entities/task.entity";

class SubTaskService {
    constructor() {}
    
    async getSubTask(subTaskId: string): Promise<IResponse> {
        const subTask = await SubTaskEntity.findOne({ _id: subTaskId });
        return msg200({
            subTask
        });
    }

    async createSubTask(subTask: any, taskId: string): Promise<IResponse> {
        const createSubTask = await SubTaskEntity.create(subTask);
        const subTaskId = (createSubTask as any)._id;
        const taskUpdate = await TaskEntity.updateOne({ _id: taskId }, { $push: { subTasks: subTaskId } });
        return msg200({
            message: (createSubTask as any)
        });
    }

    async updateSubTask(subTaskId: string, subTask: any): Promise<IResponse> {
        const updateSubTask = await SubTaskEntity.updateOne({_id: subTaskId}, subTask);
        return msg200({
            message: (updateSubTask as any)
        });
    }

    async deleteSubTask(subTaskId: string): Promise<IResponse> {
        const deleteSubTask = await SubTaskEntity.deleteOne({_id: subTaskId});
        return msg200({
            message: (deleteSubTask as any)
        });
    }
}

export const subTaskService = new SubTaskService();