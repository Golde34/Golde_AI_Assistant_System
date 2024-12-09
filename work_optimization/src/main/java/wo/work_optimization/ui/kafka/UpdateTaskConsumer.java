package wo.work_optimization.ui.kafka;

import org.springframework.stereotype.Component;

import kafka.lib.java.adapter.consumer.messagehandlers.KafkaMessageHandler;
import lombok.RequiredArgsConstructor;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.usecase.kafka.CommandFactory;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;

@Component
@RequiredArgsConstructor
public class UpdateTaskConsumer extends KafkaMessageHandler {
    
    private final CommandFactory commandFactory;

    @Override
    public String getTopic() {
        return TopicConstants.UpdateTaskCommand.TOPIC;
    }
    
    @Override
    public void processMessage(String message, String topic) {
        String cmd = ExtractKafkaMessage.getCommand(message);
        commandFactory.getCommand(cmd).process(message, cmd);
    }
}