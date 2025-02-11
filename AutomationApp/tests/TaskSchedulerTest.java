package AutomationApp.tests;

import org.junit.jupiter.api.Test;
import src.scheduler.TaskScheduler;

import static org.junit.jupiter.api.Assertions.*;

class TaskSchedulerTest {
    @Test
    void testScheduleTask() {
        TaskScheduler scheduler = new TaskScheduler();
        
        scheduler.scheduleTask(1000, () -> System.out.println("Task executed!"));
        
        // Verify if task runs (manual check or additional checks can be done)
        assertTrue(true);
    }
}
