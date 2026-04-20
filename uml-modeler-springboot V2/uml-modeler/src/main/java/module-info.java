module com.umlmodeler {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.swing;
    requires com.fasterxml.jackson.databind;
    requires com.fasterxml.jackson.core;
    requires com.fasterxml.jackson.annotation;
    requires org.slf4j;

    opens com.umlmodeler to javafx.fxml;
    opens com.umlmodeler.model to com.fasterxml.jackson.databind;
    opens com.umlmodeler.ui to javafx.fxml;
    opens com.umlmodeler.ui.nodes to javafx.fxml;
    opens com.umlmodeler.ui.relations to javafx.fxml;

    exports com.umlmodeler;
    exports com.umlmodeler.model;
    exports com.umlmodeler.ui;
    exports com.umlmodeler.engine;
}
