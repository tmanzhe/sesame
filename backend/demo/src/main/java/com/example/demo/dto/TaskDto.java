package com.example.demo.dto;


import com.example.demo.model.TaskStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TaskDto {
    private String title;  // Required
    private String description;  // Optional
    private TaskStatus status = TaskStatus.OPEN;  // Default value

    // getters and setters
}
