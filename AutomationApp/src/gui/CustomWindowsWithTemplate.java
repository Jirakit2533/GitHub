package AutomationApp.src.gui;

import java.awt.*;
import javax.swing.*;

public class CustomWindowsWithTemplate {
    public void createTemplateWindow() {
        JFrame frame = new JFrame("Template Window");
        frame.setSize(500, 400);
        frame.setLocationRelativeTo(null);
        
        // Template elements
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(2, 1));
        panel.add(new JButton("Button 1"));
        panel.add(new JTextArea("Text area here..."));
        
        frame.add(panel);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setVisible(true);
    }
}