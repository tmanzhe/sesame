package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.model.User;
import com.example.demo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService; // Inject UserService

    public TaskService(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    // Retrieve all tasks
    public Iterable<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Retrieve a specific task by its id
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        // Use the helper to get a fully loaded User entity.
        User currentUser = userService.getCurrentAuthenticatedUser();
        System.out.println("DEBUG: Creating task for user: " + currentUser.getUsername() + " (ID: " + currentUser.getId() + ")");
        task.setUser(currentUser);
        Task savedTask = taskRepository.save(task);
        System.out.println("DEBUG: Task created with ID: " + savedTask.getId());
        return savedTask;
    }

    // Update an existing task
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
                .map(existingTask -> {
                    existingTask.setTitle(updatedTask.getTitle());
                    existingTask.setDescription(updatedTask.getDescription());
                    existingTask.setStatus(updatedTask.getStatus());
                    return taskRepository.save(existingTask);
                })
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    // Delete a task by its id
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}