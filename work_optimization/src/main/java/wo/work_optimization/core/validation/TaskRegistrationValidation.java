package wo.work_optimization.core.validation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.request.QueryTaskConfigRequestDTO;
import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaskRegistrationValidation {

    public Pair<String, Boolean> validateRequest(TaskRegistrationRequestDTO request) {
        if (DataUtils.isNullOrEmpty(request)
                || request.getWorkTime() <= 0
                || request.getUserId() <= 0) {
            return Pair.of(Constants.ErrorMessage.INVALID_REQUEST, false);
        }

        if (!validateCalculatedTimeInDay(request)) {
            return Pair.of(Constants.ErrorMessage.TOTAL_TIME_IN_DAY_ERROR, false);
        }

        return Pair.of(Constants.ErrorMessage.SUCCESS, true);
    }

    private boolean validateCalculatedTimeInDay(TaskRegistrationRequestDTO request) {
        double sum = request.getEatTime() + request.getRelaxTime() + request.getTravelTime() +
                request.getWorkTime() + request.getSleepDuration();
        return !(sum > 24) && !(sum < 24);
    }

    public Pair<String, Boolean> validateQueryRequest(QueryTaskConfigRequestDTO request) {
        if (DataUtils.isNullOrEmpty(request)
                || DataUtils.isNullOrEmpty(request.getUserId())) {
            return Pair.of(Constants.ErrorMessage.INVALID_REQUEST, false);
        }

        return Pair.of(Constants.ErrorMessage.SUCCESS, true);
    }
}