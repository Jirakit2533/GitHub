package AutomationApp.src.gui;

import java.awt.*;
import javax.swing.*;

public class ControlPanel extends JPanel {
    public ControlPanel() {
        setLayout(new BorderLayout());

        // Add buttons and settings here
        JButton startButton = new JButton("Start Automation");
        JButton stopButton = new JButton("Stop Automation");

        // Example: Add action listener to start button
        startButton.addActionListener(e -> {
            // Start automation logic
        });

        add(startButton, BorderLayout.NORTH);
        add(stopButton, BorderLayout.SOUTH);
    }
}
