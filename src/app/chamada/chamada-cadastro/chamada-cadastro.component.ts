import { environment } from './../../../environments/environment';
import { Aluno, Chamada } from './../../core/model';
import { ChamadaService } from './../chamada.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProfessorService } from './../../professores/professor.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { GrowMessageService } from '../../shared/grow-message.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-chamada-cadastro',
  templateUrl: './chamada-cadastro.component.html',
  styleUrls: ['./chamada-cadastro.component.css']
})
export class ChamadaCadastroComponent implements OnInit {
 
  value: Date = new Date();
  pt: any;
  disableProf = false;
  professores: any;
  professorSelecionado: any;
  turmaDisciplinas: any;
  turmaDisciplinaSelecionada: any;
  periodos: any;
  periodosSelecionados: any;
  alunos: Array<Aluno> = [];
  alunosPresentes: any;
  codigo: any;
  edicao = false;
  chamada : any;
  

  constructor(private authService: AuthService,
    private professorService: ProfessorService,
    private errorHandler: ErrorHandlerService,
    private chamadaService: ChamadaService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private messageService: GrowMessageService,) { }


  ngOnInit() {

    this.carregaProf();

    if (this.authService.jwtPayload.tipoUsuario.descTipoUsuario === 'PROFESSOR') {
      this.disableProf = true;
      this.professorSelecionado = this.authService.jwtPayload.codigoProfessor;
    }

    const codigoChamda = this.route.snapshot.params['codigo'];
    this.codigo = codigoChamda;

    if (codigoChamda) {
      this.edicao = true;
      this.carregarChamada(codigoChamda);
    }


    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }


  carregarChamada(codigo: any): any {
    return this.chamadaService.buscarPorCodigo(codigo)
      .then(chamada => {
        this.chamada = chamada;
        this.professorSelecionado = this.chamada.turmaPeriodo.disciplinaTurma.professor.codigo;
        this.carregarTurmaDisciplina();
        this.carregaChamadaAlunos();

       }).catch(erro => this.errorHandler.handle(erro));
    }


    carregaChamadaAlunos(): any {
      return this.chamadaService.buscarChamadaAlunos(this.chamada)
      .then(alunos => {
          this.alunos = alunos;
          this.alunosPresentes = [];

          for (const aluno of this.alunos) {
            if (aluno.urlFoto === null) {
                aluno.urlFoto = environment.fotoAlunoDefault;
            }
            if (aluno.chamada) {
              this.alunosPresentes.push(String(aluno.codigo));
            }
          }
      }
    ).catch(erro => this.errorHandler.handle(erro));
  }


  carregaProf(): any {
    return this.professorService.listarTodas()
      .then(profs => {
        this.professores = profs
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTurmaDisciplina(): any {
    this.onChangeTurma();
    return this.chamadaService.getTurmasProfessor(this.professorSelecionado)
      .then(turmaDisciplinas => {
      
        if (this.chamada){
          this.turmaDisciplinaSelecionada =  this.chamada.turmaPeriodo.disciplinaTurma.codigo;
          let newDt = new Date(this.chamada.dataChamada);
          this.value = new Date(newDt.valueOf() + newDt.getTimezoneOffset() * 60000);
          this.carregarPeriodos();
        } else {
          this.turmaDisciplinaSelecionada = null;
          this.value = null;
          this.periodosSelecionados = null;
          this.alunos = [];
          this.alunosPresentes = null;
        }
        

        this.turmaDisciplinas = turmaDisciplinas        
        .map(p => ({ label: p.turmaDisciplina, value: p.codigo }));
      }
    )
      .catch(erro => this.errorHandler.handle(erro));
  }


  carregarPeriodos(): any {

    return this.chamadaService.getPeriodos(this.value, this.turmaDisciplinaSelecionada)
      .then(periodos => {
        this.periodos = periodos
        .map(p => ({ label: p.periodo, value: p.codigo }));
        if (this.chamada) {
          let myArr1: number[] = [this.chamada.turmaPeriodo.codigo];
          this.periodosSelecionados = myArr1;
        } else {
          this.periodosSelecionados = null;
          this.alunos = [];
          this.alunosPresentes = null;
        }
      })
      .catch(erro => {
        this.periodosSelecionados = null;
        this.alunos = [];
        this.alunosPresentes = null;
        this.periodos = null;
        this.errorHandler.handle(erro)});
  }

  carregarAlunos(): any {

    if (this.alunos.length === 0) {
      return this.chamadaService.getAlunos(this.turmaDisciplinaSelecionada)
        .then(alunos => {
          this.alunos = alunos;

          for (const aluno of alunos) {
            if (aluno.urlFoto === null) {
              aluno.urlFoto = environment.fotoAlunoDefault;
            }
          }

        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  }

  onChangeTurma(){
    this.value = null;
    this.periodosSelecionados = null;
    this.periodos = null;
    this.alunos = [];
    this.alunosPresentes = null;
  }

  salvar(form: FormControl) {
    if (this.edicao) {
      this.atualizar();
    } else {
      this.adicionar();
    }
  }

  adicionar() {
    const chamada = new Chamada();
    chamada.alunosPresentes = this.alunosPresentes;
    chamada.periodosSelecionados= this.periodosSelecionados;
    chamada.dateChamada = this.value;
    this.chamadaService.chamada(chamada)
        .then(chamada => {
          this.messageService.addSucesso('Chamada adicionada com sucesso!');
          let dateLong: any;
          if (this.value) {
            dateLong = this.value.getTime();
          }
          
          this.router.navigate(['/chamada',{professorSelecionado: this.professorSelecionado, turmaDisciplinaSelecionada: this.turmaDisciplinaSelecionada, date: dateLong}]);
        }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizar() {
    let chamada = new Chamada();
    chamada.codigo = this.codigo;
    chamada.alunosPresentes = this.alunosPresentes;
    chamada.periodosSelecionados= this.periodosSelecionados;
    chamada.dateChamada = this.value;
    this.chamadaService.chamadaAlteracao(chamada)
        .then(chamada => {
          this.messageService.addSucesso('Chamada Aletarda com sucesso!');
          this.router.navigate(['/chamada',{professorSelecionado: this.professorSelecionado, turmaDisciplinaSelecionada: this.turmaDisciplinaSelecionada, date: this.value.getTime()}]);
        }).catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.router.navigate(['/chamada/nova']);
  }

  voltar() {
    let dateLong: any;
    console.log(this.value);
    if (this.value) {
      dateLong = this.value.getTime();
    }
    this.router.navigate(['/chamada',{professorSelecionado: this.professorSelecionado, turmaDisciplinaSelecionada: this.turmaDisciplinaSelecionada, date: dateLong}]);
  }
}
