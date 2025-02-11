package AutomationApp.src.debug;

public class DebugScriptExecution {
    public void debug(String script) {
        System.out.println("Debugging script: " + script);
        // Example of printing out each step of the script execution
        String[] steps = script.split(";");  // Assume script is semicolon-separated
        for (String step : steps) {
            System.out.println("Executing: " + step);
            // Simulate execution of each step
        }
    }
}
