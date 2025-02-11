package AutomationApp.src.gui;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import javax.swing.*;

public class ActionLogger extends JPanel {
    private JTextArea logArea;
    private List<String> logs;

    public ActionLogger() {
        logArea = new JTextArea(10, 40);
        logArea.setEditable(false);
        logs = new ArrayList<>();
        setLayout(new BorderLayout());
        add(new JScrollPane(logArea), BorderLayout.CENTER);
    }

    public void logAction(String action) {
        logs.add(action);
        logArea.append(action + "\n");
    }
}
