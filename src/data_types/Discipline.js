export default class Discipline {
  constructor(props) {
    const {
      nomeDisciplina:name,
      curso:course,
      cursoId:courseId,
      termo:semester,
      termoId:semesterId,
      clDisciplinaTurma:disciplineClass,
      id
    } = props;

    this.id = id;
    this.name = name;
    this.course = course;
    this.courseId = courseId;
    this.semester = semester;
    this.semesterId = semesterId;
    this.disciplineClass = disciplineClass;
  }
}