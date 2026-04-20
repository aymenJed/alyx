package com.umlmodeler;

import com.umlmodeler.ui.MainWindow;
import javafx.application.Application;
import javafx.stage.Stage;

public class MainApp extends Application {

    @Override
    public void start(Stage primaryStage) {
        MainWindow mainWindow = new MainWindow(primaryStage);
        mainWindow.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
