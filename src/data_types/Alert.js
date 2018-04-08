export default class Alert {
  constructor(priority, studentId, message, old, date, origin, alertId) {
    
    this.priority       = priority;
    this.studentId      = studentId;
    this.message        = message;
    this.old            = old;
    this.date           = date;
    this.origin         = origin;
    this.alertId        = alertId;
  }
}