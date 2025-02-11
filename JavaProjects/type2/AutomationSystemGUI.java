package JavaProjects.type2;

import java.awt.*;
import java.awt.event.*;
import java.util.*;
import java.util.List;
import java.util.Timer;
import javax.swing.*;
import java.io.*;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

public class AutomationSystemGUI {
    private JFrame frame;
    private JTextArea actionLogArea;
    private JButton recordButton, playButton, stopButton, searchImageButton;
    private JComboBox<String> delayComboBox;
    private boolean isRecording = false;
    private List<Action> actions = new ArrayList<>();
    private Timer timer;

    // Constructor
    public AutomationSystemGUI() {
        frame = new JFrame("Automatic Mouse and Keyboard System");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 400);
        frame.setLayout(new BorderLayout());

        // Action log area
        actionLogArea = new JTextArea();
        actionLogArea.setEditable(false);
        frame.add(new JScrollPane(actionLogArea), BorderLayout.CENTER);

        // Control panel
        JPanel controlPanel = new JPanel();
        controlPanel.setLayout(new FlowLayout());
        frame.add(controlPanel, BorderLayout.SOUTH);

        recordButton = new JButton("Record");
        playButton = new JButton("Play");
        stopButton = new JButton("Stop");
        searchImageButton = new JButton("Search Image");
        delayComboBox = new JComboBox<>(new String[]{"0.5s", "1s", "2s", "3s"});

        controlPanel.add(recordButton);
        controlPanel.add(playButton);
        controlPanel.add(stopButton);
        controlPanel.add(searchImageButton);
        controlPanel.add(delayComboBox);

        // Action listeners
        recordButton.addActionListener(e -> startRecording());
        playButton.addActionListener(e -> startPlayback());
        stopButton.addActionListener(e -> stopRecording());
        searchImageButton.addActionListener(e -> searchImage());

        frame.setVisible(true);
    }

    // Function to start recording actions
    public void startRecording() {
        if (!isRecording) {
            actions.clear();
            isRecording = true;
            actionLogArea.append("Recording started...\n");

            // Register listeners for mouse and keyboard events
            Toolkit.getDefaultToolkit().addAWTEventListener(new AWTEventListener() {
                @Override
                public void eventDispatched(AWTEvent event) {
                    if (event instanceof MouseEvent) {
                        MouseEvent mouseEvent = (MouseEvent) event;
                        if (isRecording) {
                            if (mouseEvent.getID() == MouseEvent.MOUSE_PRESSED) {
                                actions.add(new Action(Action.Type.MOUSE, Action.SubType.CLICK, mouseEvent.getPoint()));
                                actionLogArea.append("Mouse Click at: " + mouseEvent.getPoint() + "\n");
                            }
                            if (mouseEvent.getID() == MouseEvent.MOUSE_MOVED) {
                                actions.add(new Action(Action.Type.MOUSE, Action.SubType.MOVE, mouseEvent.getPoint()));
                                actionLogArea.append("Mouse Move to: " + mouseEvent.getPoint() + "\n");
                            }
                        }
                    }
                    if (event instanceof KeyEvent) {
                        KeyEvent keyEvent = (KeyEvent) event;
                        if (keyEvent.getID() == KeyEvent.KEY_PRESSED && isRecording) {
                            actions.add(new Action(Action.Type.KEYBOARD, keyEvent.getKeyChar()));
                            actionLogArea.append("Key Pressed: " + keyEvent.getKeyChar() + "\n");
                        }
                    }
                }
            }, AWTEvent.MOUSE_EVENT_MASK | AWTEvent.KEY_EVENT_MASK);
        }
    }

    // Function to stop recording actions
    public void stopRecording() {
        if (isRecording) {
            isRecording = false;
            actionLogArea.append("Recording stopped.\n");
        }
    }

    // Function to start playback
    public void startPlayback() {
        if (!actions.isEmpty()) {
            actionLogArea.append("Playback started...\n");
            // Playback actions with delay
            for (Action action : actions) {
                simulateAction(action);
                try {
                    Thread.sleep(getDelayFromComboBox());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            actionLogArea.append("Playback finished.\n");
        }
    }

    // Function to simulate mouse/keyboard action
    private void simulateAction(Action action) {
        if (action.type == Action.Type.MOUSE) {
            if (action.subType == Action.SubType.CLICK) {
                simulateMouseClick(action.position);
            } else if (action.subType == Action.SubType.MOVE) {
                simulateMouseMove(action.position);
            }
        } else if (action.type == Action.Type.KEYBOARD) {
            simulateKeyPress(action.key);
        }
    }

    // Function to simulate mouse click
    private void simulateMouseClick(Point position) {
        Robot robot = createRobot();
        robot.mouseMove(position.x, position.y);
        robot.mousePress(InputEvent.BUTTON1_MASK);
        robot.mouseRelease(InputEvent.BUTTON1_MASK);
    }

    // Function to simulate mouse movement
    private void simulateMouseMove(Point position) {
        Robot robot = createRobot();
        robot.mouseMove(position.x, position.y);
    }

    // Function to simulate key press
    private void simulateKeyPress(char key) {
        Robot robot = createRobot();
        robot.keyPress(KeyEvent.getExtendedKeyCodeForChar(key));
        robot.keyRelease(KeyEvent.getExtendedKeyCodeForChar(key));
    }

    // Function to create Robot instance
    private Robot createRobot() {
        try {
            return new Robot();
        } catch (AWTException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Function to get delay from JComboBox
    private long getDelayFromComboBox() {
        String selectedDelay = (String) delayComboBox.getSelectedItem();
        switch (selectedDelay) {
            case "0.5s":
                return 500;
            case "1s":
                return 1000;
            case "2s":
                return 2000;
            case "3s":
                return 3000;
            default:
                return 0;
        }
    }

    // Function to search for image on screen
    public void searchImage() {
        String imagePath = JOptionPane.showInputDialog("Enter image path to search for:");
        actionLogArea.append("Searching for image: " + imagePath + "\n");

        // Add image search logic using Image Recognition libraries like OpenCV or other solutions
        try {
            BufferedImage imageToSearch = ImageIO.read(new File(imagePath));
            // Assuming screen capture logic for comparison (openCV or other methods)
            // Example: BufferedImage screenShot = captureScreen();
            // Compare images: compareImages(screenShot, imageToSearch);
        } catch (IOException e) {
            actionLogArea.append("Error loading image.\n");
            e.printStackTrace();
        }
    }

    // Method to capture screen (simplified)
    private BufferedImage captureScreen() {
        try {
            Rectangle screenRect = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
            return new Robot().createScreenCapture(screenRect);
        } catch (AWTException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Main method
    public static void main(String[] args) {
        SwingUtilities.invokeLater(AutomationSystemGUI::new);
    }

    // Inner class for Action (Mouse and Keyboard events)
    static class Action {
        enum Type {MOUSE, KEYBOARD}
        enum SubType {CLICK, MOVE, KEY_PRESS}

        Type type;
        SubType subType;
        Point position;
        char key;

        public Action(Type type, SubType subType, Point position) {
            this.type = type;
            this.subType = subType;
            this.position = position;
        }

        public Action(Type type, char key) {
            this.type = type;
            this.key = key;
        }
    }
}
