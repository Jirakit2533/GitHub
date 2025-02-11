package AutomationApp.src.actions;

import java.awt.*;
import java.awt.event.KeyEvent;

public class KeyboardActionHandler {
    public void pressKey(String key) {
        try {
            Robot robot = new Robot();
            int keyCode = KeyEvent.getExtendedKeyCodeForChar(key.charAt(0));
            robot.keyPress(keyCode);
            robot.keyRelease(keyCode);
            System.out.println("Key pressed: " + key);
        } catch (AWTException e) {
            e.printStackTrace();
        }
    }
}