package AutomationApp.src.actions;

public class SwitchCaseCondition {
    public void executeCase(int value) {
        switch (value) {
            case 1:
                System.out.println("Case 1 executed");
                break;
            case 2:
                System.out.println("Case 2 executed");
                break;
            default:
                System.out.println("Default case executed");
        }
    }
}