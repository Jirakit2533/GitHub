package AutomationApp.src.scheduler;

import java.util.Timer;
import java.util.TimerTask;

public class TaskScheduler {
    private Timer timer;
    
    public TaskScheduler() {
        timer = new Timer();
    }

    public void scheduleTask(long delay, Runnable task) {
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                task.run();
            }
        }, delay);
    }
}
