package AutomationApp.src.actions;

import java.io.*;
import java.util.List;

public class ImportExportActions {
    public void exportActionsToFile(List<String> actions, String fileName) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            for (String action : actions) {
                writer.write(action);
                writer.newLine();
            }
            System.out.println("Actions exported to: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<String> importActionsFromFile(String fileName) {
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Imported action: " + line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}