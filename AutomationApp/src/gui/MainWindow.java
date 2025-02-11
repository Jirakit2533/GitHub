package AutomationApp.src.gui;

import javax.swing.*;

public class MainWindow {
    private JFrame frame;

    public void createWindow() {
        frame = new JFrame("Automation Application");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(800, 600);
        frame.setLocationRelativeTo(null);  // Center the window

        // Add a control panel and display it
        ControlPanel controlPanel = new ControlPanel();
        frame.add(controlPanel);
        
        frame.setVisible(true);
    }
}
