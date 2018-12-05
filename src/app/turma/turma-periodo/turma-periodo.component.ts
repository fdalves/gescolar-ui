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
    if (this.codigoTurma) {
      this.initDisciplina();
      this.initPeriodos();
      this.initProfessores();
    }

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
          map(t => ({ label: t.nome, value: {id: t.codigo, name: t.nome} }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  public initProfessores() {
    return this.professorService.listarTodas()
      .then(professores => {
        this.professores = professores.
          map(t => ({ label: t.nome, value: {id: t.codigo, name: t.nome} }));
        })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    for (const periodo of  this.periodosSelecionado) {
        if (periodo.dia === 'SEGUNDA') {
          for (const periodoSegunda of  this.segunda) {
            if (periodo.periodo === periodoSegunda.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma();
                 this.removeVagos(periodoSegunda);
                 periodoSegunda.disciplinaTurma = disciplinaTurma;
              }
          }
        }

        if (periodo.dia === 'TERCA') {
          for (const periodoTerca of  this.terca) {
            if (periodo.periodo === periodoTerca.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma();
                 this.removeVagos(periodoTerca);
                 periodoTerca.disciplinaTurma = disciplinaTurma;
              }
          }
        }

        if (periodo.dia === 'QUARTA') {
          for (const periodoQuarta of  this.quarta) {
            if (periodo.periodo === periodoQuarta.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma();
                 this.removeVagos(periodoQuarta);
                 periodoQuarta.disciplinaTurma = disciplinaTurma;
              }
          }
        }

        if (periodo.dia === 'QUINTA') {
          for (const periodoQinta of  this.quinta) {
            if (periodo.periodo === periodoQinta.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma();
                 this.removeVagos(periodoQinta);
                 periodoQinta.disciplinaTurma = disciplinaTurma;
              }
          }
        }

        if (periodo.dia === 'SEXTA') {
          for (const periodoSexta of  this.sexta) {
            if (periodo.periodo === periodoSexta.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma();
                 this.removeVagos(periodoSexta);
                 periodoSexta.disciplinaTurma = disciplinaTurma;
              }
          }
        }

        if (periodo.dia === 'SABADO') {
          for (const periodoSabado of  this.sabado) {
            if (periodo.periodo === periodoSabado.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma();
                 this.removeVagos(periodoSabado);
                 periodoSabado.disciplinaTurma = disciplinaTurma;
              }
          }
        }
    }
    this.fecharPopUp();
  }

  limparPopUp() {
    this.periodosSelecionado = null;
    this.disciplinaSelecionada = null;
    this.professorSelecionado = null;
  }

  fecharPopUp() {
    this.limparPopUp();
    this.exbindoFormulario = false;
  }


  removeVagos(periodo: any) {
    for (const periodoVago of this.periodosVagos) {
      if (periodoVago.dia === periodo.dia && periodoVago.periodo === periodo.periodo) {
        const index = this.periodosVagos.findIndex(p => p === periodoVago);
        console.log(index);
        this.periodosVagos.splice(index, 1);
      }
    }
  }

  getDiciplinaTurma(): any {
    const disciplinaTurma = {'codigoTurma': this.codigoTurma,
                            'codigoProfessor': this.professorSelecionado.id,
                            'nomeProfessor': this.professorSelecionado.name,
                            'codigoDisciplina': this.disciplinaSelecionada.id,
                            'nomeDisciplina': this.disciplinaSelecionada.name};
    return disciplinaTurma;
  }

}
