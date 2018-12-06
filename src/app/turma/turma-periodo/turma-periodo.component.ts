import { ConfirmationService } from 'primeng/components/common/api';
import { GrowMessageService } from './../../shared/grow-message.service';
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
    private errorHandler: ErrorHandlerService,
    private messageService: GrowMessageService,
    private confirmation: ConfirmationService) { }

  ngOnInit() {
    if (this.codigoTurma) {
      this.initDisciplina();
      this.initPeriodos();
      this.initProfessores();
    }

    console.log(this.periodos);
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
        this.fecharPopUp();
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
    const disciplinaSalvas = [];
    for (const periodo of  this.periodosSelecionado) {
        if (periodo.dia === 'SEGUNDA') {
          for (const periodoSegunda of  this.segunda) {
            if (periodo.periodo === periodoSegunda.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma(periodoSegunda.codigo);
                disciplinaSalvas.push(disciplinaTurma);
              }
          }
        }

        if (periodo.dia === 'TERCA') {
          for (const periodoTerca of  this.terca) {
            if (periodo.periodo === periodoTerca.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma(periodoTerca.codigo);
                disciplinaSalvas.push(disciplinaTurma);
              }
          }
        }

        if (periodo.dia === 'QUARTA') {
          for (const periodoQuarta of  this.quarta) {
            if (periodo.periodo === periodoQuarta.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma(periodoQuarta.codigo);
                disciplinaSalvas.push(disciplinaTurma);
              }
          }
        }

        if (periodo.dia === 'QUINTA') {
          for (const periodoQinta of  this.quinta) {
            if (periodo.periodo === periodoQinta.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma(periodoQinta.codigo);
                disciplinaSalvas.push(disciplinaTurma);
              }
          }
        }

        if (periodo.dia === 'SEXTA') {
          for (const periodoSexta of  this.sexta) {
            if (periodo.periodo === periodoSexta.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma(periodoSexta.codigo);
                 disciplinaSalvas.push(disciplinaTurma);
              }
          }
        }

        if (periodo.dia === 'SABADO') {
          for (const periodoSabado of  this.sabado) {
            if (periodo.periodo === periodoSabado.periodo) {
                 const disciplinaTurma = this.getDiciplinaTurma(periodoSabado.codigo);
                 disciplinaSalvas.push(disciplinaTurma);
              }
          }
        }
    }
    this.adicionarDisciplina(disciplinaSalvas);
   }


  adicionarDisciplina(disciplinaSalvas: any) {
    this.turmaService.salvarDisciplina(disciplinaSalvas)
      .then(obj => {
        if (disciplinaSalvas.length > 1) {
          this.messageService.addSucesso('Disciplinas adicionadas com sucesso!');
        } else {
          this.messageService.addSucesso('Disciplina adicionadas com sucesso!');
        }
        this.initPeriodos();
      })
      .catch(erro => this.errorHandler.handle(erro));
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


  getDiciplinaTurma(codigoTurmaPeriodo: number): any {
    const disciplinaTurma = {'codigoTurma': this.codigoTurma,
                            'codigoProfessor': this.professorSelecionado.id,
                            'nomeProfessor': this.professorSelecionado.name,
                            'codigoDisciplina': this.disciplinaSelecionada.id,
                            'nomeDisciplina': this.disciplinaSelecionada.name,
                            'codigoTurmaPeriodo': codigoTurmaPeriodo };
    return disciplinaTurma;
  }

  deletePeriodo(perido: any, e: any) {
    e.preventDefault();
    this.confirmation.confirm({
      message: 'Tem certeza que deseja Periodo/Disciplina ?',
      accept: () => {
        this.excluir(perido.disciplinaTurma.codigo);
      }
    });
  }

  excluir(codigoDisciplina: any) {
    this.turmaService.excluirDisciplina(codigoDisciplina)
      .then(() => {
        this.ngOnInit();
        this.messageService.addSucesso('Periodo/Disciplina excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
