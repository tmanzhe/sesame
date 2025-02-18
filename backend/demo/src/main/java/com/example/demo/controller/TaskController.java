package com.example.demo.controller;

import com.example.demo.dto.TaskDto;
import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import com.example.demo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Retrieve all tasks
    @GetMapping
    public ResponseEntity<Iterable<Task>> getAllTasks() {
        Iterable<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // Retrieve a task by its id
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDto taskDto) {
        System.out.println("DEBUG: Received TaskDto: " + taskDto);
        // Map TaskDto to Task
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus() != null ? taskDto.getStatus() : TaskStatus.OPEN);

        // Let the TaskService handle retrieving the current user.
        Task createdTask = taskService.createTask(task);
        System.out.println("DEBUG: Task created successfully with ID: " + createdTask.getId());
        return ResponseEntity.ok(createdTask);
    }

    // Update an existing task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        return ResponseEntity.ok(updatedTask);
    }

    // Delete a task by its id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}