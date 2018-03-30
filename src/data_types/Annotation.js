export default class Annotation {
  constructor(props) {
    const {
      mensagem:message,
      alunoId:studentId,
      id:annotationId,
    } = props;
    
    this.message        = message;
    this.studentId      = studentId;
    this.annotationId   = annotationId;
  }
}