import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

// คลาสสำหรับเก็บข้อมูลการกระทำของคีย์บอร์ดและเมาส์
class Action {
    String type; // ประเภทของการกระทำ (key หรือ mouse)
    String key; // ปุ่มที่ถูกกด (ใช้กับคีย์บอร์ด)
    int x, y; // พิกัดเมาส์ (ใช้กับเมาส์)
    long timestamp; // เวลาที่เกิดเหตุการณ์ (ms)
    
    public Action(String type, String key, int x, int y, long timestamp) {
        this.type = type;
        this.key = key;
        this.x = x;
        this.y = y;
        this.timestamp = timestamp;
    }
}

public class MacroRecorder extends JFrame {
    private DefaultListModel<String> logModel; // เก็บข้อความแสดงใน UI
    private List<Action> actions; // รายการของการกระทำที่บันทึกไว้
    private long startTime; // เวลาที่เริ่มบันทึก
    private boolean recording; // สถานะบันทึก
    private Robot robot; // ใช้สำหรับจำลองการกดปุ่มและเมาส์
    
    public MacroRecorder() {
        try {
            robot = new Robot();
        } catch (AWTException e) {
            e.printStackTrace();
        }
        
        // ตั้งค่าหน้าต่าง UI
        setTitle("Macro Recorder");
        setSize(500, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        
        logModel = new DefaultListModel<>();
        JList<String> logList = new JList<>(logModel);
        add(new JScrollPane(logList), BorderLayout.CENTER);
        
        JPanel panel = new JPanel();
        JButton startBtn = new JButton("Start Recording");
        JButton stopBtn = new JButton("Stop Recording");
        JButton playBtn = new JButton("Play Macro");
        
        panel.add(startBtn);
        panel.add(stopBtn);
        panel.add(playBtn);
        add(panel, BorderLayout.SOUTH);
        
        actions = new CopyOnWriteArrayList<>();
        
        // กำหนดการทำงานของปุ่ม
        startBtn.addActionListener(e -> startRecording());
        stopBtn.addActionListener(e -> stopRecording());
        playBtn.addActionListener(e -> playMacro());
        
        // ดักจับการกดคีย์บอร์ด
        KeyboardFocusManager.getCurrentKeyboardFocusManager().addKeyEventDispatcher(e -> {
            if (recording && e.getID() == KeyEvent.KEY_PRESSED) {
                long elapsed = System.currentTimeMillis() - startTime;
                actions.add(new Action("key", KeyEvent.getKeyText(e.getKeyCode()), -1, -1, elapsed));
                logModel.addElement("Key Pressed: " + KeyEvent.getKeyText(e.getKeyCode()) + " at " + elapsed + "ms");
            }
            return false;
        });
        
        // ดักจับการคลิกเมาส์
        Toolkit.getDefaultToolkit().addAWTEventListener(event -> {
            if (recording && event instanceof MouseEvent mouseEvent) {
                if (mouseEvent.getID() == MouseEvent.MOUSE_PRESSED) {
                    long elapsed = System.currentTimeMillis() - startTime;
                    actions.add(new Action("mouse", "click", mouseEvent.getX(), mouseEvent.getY(), elapsed));
                    logModel.addElement("Mouse Clicked at: (" + mouseEvent.getX() + ", " + mouseEvent.getY() + ") at " + elapsed + "ms");
                }
            }
        }, AWTEvent.MOUSE_EVENT_MASK);
    }
    
    // เริ่มบันทึกการกระทำ
    private void startRecording() {
        logModel.clear();
        actions.clear();
        startTime = System.currentTimeMillis();
        recording = true;
        logModel.addElement("Recording started...");
    }
    
    // หยุดบันทึกการกระทำ
    private void stopRecording() {
        recording = false;
        logModel.addElement("Recording stopped.");
    }
    
    // เล่นซ้ำการกระทำที่บันทึกไว้
    private void playMacro() {
        if (actions.isEmpty()) {
            logModel.addElement("No actions recorded!");
            return;
        }
        logModel.addElement("Playing macro...");
        new Thread(() -> {
            long startPlayback = System.currentTimeMillis();
            for (Action action : actions) {
                try {
                    Thread.sleep(Math.max(0, action.timestamp - (System.currentTimeMillis() - startPlayback)));
                    
                    if (action.type.equals("key")) {
                        logModel.addElement("Key Played: " + action.key);
                        int keyCode = KeyEvent.getExtendedKeyCodeForChar(action.key.charAt(0));
                        robot.keyPress(keyCode);
                        robot.keyRelease(keyCode);
                    } else if (action.type.equals("mouse")) {
                        logModel.addElement("Mouse Click Played at: (" + action.x + ", " + action.y + ")");
                        robot.mouseMove(action.x, action.y);
                        robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
                        robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
            logModel.addElement("Macro playback finished.");
        }).start();
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new MacroRecorder().setVisible(true));
    }
}
