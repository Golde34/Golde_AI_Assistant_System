package wo.work_optimization.core.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "task")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private int priority;
    private String status;
    private long startDate;
    private double duration;
    private long endDate;
    private String activeStatus;
    private String originalId;
    private String scheduleTaskId;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    private ParentTask parentTask;
}
