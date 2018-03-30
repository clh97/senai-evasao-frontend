export default class Student {
  constructor(props) {
    const {
      clAlertas:alerts,
      clAlunoDisciplinaTurma:courseClass,
      clAnotacoes:annotations,
      clPlanilhaDados:dataSheet,
      id,
      iotDados:iotData,
      matricula:registration,
      nomeAluno:name, statusAlunoEvadiu:evasionStatus
    } = props;
    
    this.alerts         = alerts;
    this.courseClass    = courseClass;
    this.annotations    = annotations;
    this.dataSheet      = dataSheet;
    this.id             = id;
    this.iotData        = iotData;
    this.registration   = registration;
    this.name           = name;
    this.evasionStatus  = evasionStatus;
  }
}

export const associateStudentData = ( studentData ) => {
  return new Student(studentData);
}