package AutomationApp.src.gui;

import java.awt.*;
import javax.swing.*;

public class AnimatedGIFDisplay {
    public void displayGIF(String gifPath) {
        JFrame frame = new JFrame("GIF Display");
        frame.setSize(400, 400);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        
        ImageIcon gifIcon = new ImageIcon(gifPath);
        JLabel label = new JLabel(gifIcon);
        frame.add(label, BorderLayout.CENTER);
        
        frame.setVisible(true);
    }
}