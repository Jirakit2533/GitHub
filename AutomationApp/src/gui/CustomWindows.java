package AutomationApp.src.gui;

import javax.swing.*;

public class CustomWindows {
    public void createCustomWindow(String title) {
        JFrame customFrame = new JFrame(title);
        customFrame.setSize(400, 300);
        customFrame.setLocationRelativeTo(null);
        customFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        
        // Add custom content, like a button
        JButton button = new JButton("Custom Window Button");
        customFrame.add(button);
        
        customFrame.setVisible(true);
    }
}