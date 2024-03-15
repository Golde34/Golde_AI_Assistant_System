package wo.work_optimization.ui.restful.router;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import wo.work_optimization.core.domain.request.TaskRequestDTO;
import wo.work_optimization.core.domain.response.TaskResponseDTO;
import wo.work_optimization.core.domain.response.base.GeneralResponse;

@RequestMapping("/schedule")
public interface ScheduleRouter {

    @GetMapping("/get-method-schedule")
    ResponseEntity<GeneralResponse<TaskResponseDTO>> getMethodSchedule(@RequestBody TaskRequestDTO method);
}
