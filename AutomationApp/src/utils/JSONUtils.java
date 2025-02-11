package AutomationApp.src.utils;

import org.json.JSONObject;

import java.io.File;
import java.nio.file.Files;

public class JSONUtils {
    public static JSONObject readJSON(String filePath) {
        try {
            String content = new String(Files.readAllBytes(new File(filePath).toPath()));
            return new JSONObject(content);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void writeJSON(String filePath, JSONObject jsonObject) {
        try {
            Files.write(new File(filePath).toPath(), jsonObject.toString().getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
