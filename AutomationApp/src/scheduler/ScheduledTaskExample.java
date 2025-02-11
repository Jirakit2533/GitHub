package AutomationApp.src.scheduler;

public class ScheduledTaskExample {
    public static void main(String[] args) {
        TaskScheduler scheduler = new TaskScheduler();
        
        // Run a task after 2 seconds delay
        scheduler.scheduleTask(2000, () -> System.out.println("Task executed after 2 seconds"));

        // Repeated task every 3 seconds
        scheduler.scheduleTask(3000, () -> System.out.println("Task executed every 3 seconds"));
    }
}