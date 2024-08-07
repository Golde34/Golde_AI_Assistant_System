package wo.work_optimization.infrastructure.store.adapter;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.port.store.TaskRegistrationStore;
import wo.work_optimization.infrastructure.store.repository.TaskRegistrationRepository;

import java.util.Optional;

@Slf4j
@Service
public class TaskRegistrationAdapter implements TaskRegistrationStore {
    
    private final TaskRegistrationRepository taskRegistrationRepository;

    public TaskRegistrationAdapter(TaskRegistrationRepository taskRegistrationRepository) {
        this.taskRegistrationRepository = taskRegistrationRepository;
    }

    @Override
    @Transactional
    public void userRegisterTaskOperation(TaskRegistration taskRegistration) {
        taskRegistrationRepository.save(taskRegistration);
        log.info("Task registered: {}", taskRegistration);
    }

    @Override
    @Transactional
    public Optional<TaskRegistration> getTaskRegistrationByUserId(Long id) {
        return taskRegistrationRepository.findByUserIdAndStatus(id, Constants.Status.ACTIVE);
    }
}
