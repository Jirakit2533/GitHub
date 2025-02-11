package AutomationApp.src.actions;

import java.awt.*;
import java.awt.event.InputEvent;

public class MouseActionHandler {
    public void clickMouse(int x, int y) {
        try {
            Robot robot = new Robot();
            robot.mouseMove(x, y);
            robot.mousePress(InputEvent.BUTTON1_MASK);
            robot.mouseRelease(InputEvent.BUTTON1_MASK);
            System.out.println("Mouse clicked at (" + x + ", " + y + ")");
        } catch (AWTException e) {
            e.printStackTrace();
        }
    }
}