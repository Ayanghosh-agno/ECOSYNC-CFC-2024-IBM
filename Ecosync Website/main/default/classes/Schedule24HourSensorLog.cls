global class Schedule24HourSensorLog implements Schedulable {
    global void execute(SchedulableContext sc) {
        FirebaseCallout.makeCalloutAndProcessData();
    }
}