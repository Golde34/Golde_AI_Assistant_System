package wo.work_optimization.core.port.store;

import java.util.List;

import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.domain.entity.Task;

public interface TaskStore {
    void save(Task task);
    void createTask(Task task);
    Task findTaskByOriginalId(String originalId);
    List<Task> findAll();
    List<Task> findAllBySchedulePlan(String scheduleId);
    List<Task> findAllByGroupTask(String groupTaskId);
    List<Task> findAllByProject(String projectId);
    Task addParentTaskId(String taskId, ParentTask parentTask);
    Task findtaskByScheduleIdAndTaskId(String scheduleTaskId, String taskId);
    Task checkSyncWithSchedulePlan(String taskId, String scheduleId); 
}
