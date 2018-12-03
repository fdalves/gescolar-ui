import { FormGroup, FormControl } from '@angular/forms';
import { ProfessorService } from './../../professores/professor.service';
import { TurmaService } from './../turma.service';
import { Component, OnInit, Input } from '@angular/core';
import { ErrorHandlerService } from './../../core/error-handler.service';



@Component({
  selector: 'app-turma-periodo',
  templateUrl: './turma-periodo.component.html',
  styleUrls: ['./turma-periodo.component.css']
})
export class TurmaPeriodoComponent implements OnInit {


  @Input()
  codigoTurma: number;

  periodos: any;
  periodosVagos = [];
  periodosSelecionado = [];
  segunda = [];
  terca = [];
  quarta = [];
  quinta = [];
  sexta = [];
  sabado = [];
  exbindoFormulario = false;
  disciplinas = [];
  professores = [];
  disciplinaSelecionada: any;
  professorSelecionado: any;

  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.initDisciplina();
    this.initPeriodos();
    this.initProfessores();
  }


  public initPeriodos() {
    return this.turmaService.buscarTurmaPeriodo(this.codigoTurma)
      .then(periodos => {
        this.periodos = periodos;
        this.segunda = periodos.segunda;
        this.terca = periodos.terca;
        this.quarta = periodos.quarta;
        this.quinta = periodos.quinta;
        this.sexta = periodos.sexta;
        this.sabado = periodos.sabado;
        this.periodosVagos = periodos.vagos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  addDisciplina() {
    this.exbindoFormulario = true;
  }

  public initDisciplina() {
    return this.turmaService.listarDisciplinas()
      .then(disciplinas => {
        this.disciplinas = disciplinas.
          map(t => ({ label: t.nome, value: t.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  public initProfessores() {
    return this.professorService.listarTodas()
      .then(professores => {
        this.professores = professores.
          map(t => ({ label: t.nome, value: t.codigo }));
        })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
  }
}
