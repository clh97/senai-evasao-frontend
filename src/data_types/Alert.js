export default class Alert {
  constructor(props) {
    const {
      nivelPrioridade:priority,
      alunoId:studentId,
      mensagemAlerta:message,
      alertaAntigo:old,
      dataAlerta:date,
      origemAlerta:origin,
      id:alertId
    } = props;
    
    this.priority       = priority;
    this.studentId      = studentId;
    this.message        = message;
    this.old            = old;
    this.date           = date;
    this.origin         = origin;
    this.alertId        = alertId;
  }
}