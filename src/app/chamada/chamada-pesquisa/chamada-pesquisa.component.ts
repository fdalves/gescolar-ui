import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../professores/professor.service';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ChamadaService } from '../chamada.service';
import { Aluno, ChamadaPesquisa } from '../../core/model';
import { FormControl } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-chamada-pesquisa',
  templateUrl: './chamada-pesquisa.component.html',
  styleUrls: ['./chamada-pesquisa.component.css']
})
export class ChamadaPesquisaComponent implements OnInit {

  value: Date = new Date();;
  value2: Date = new Date();;
  pt: any;
  professores: any;
  professorSelecionado: any;
  disableProf = false;
  turmaDisciplinas: any;
  turmaDisciplinaSelecionada: any;
  

  constructor(private authService: AuthService,
    private professorService: ProfessorService,
    private errorHandler: ErrorHandlerService,
    private chamadaService: ChamadaService) { }

    
  ngOnInit() {

    this.carregaProf();
    if (this.authService.jwtPayload.tipoUsuario.descTipoUsuario === 'PROFESSOR') {
      this.disableProf = true;
      this.professorSelecionado = this.authService.jwtPayload.codigoProfessor;
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


  carregaProf(): any {
    return this.professorService.listarTodas()
      .then(profs => {
        this.professores = profs
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTurmaDisciplina(): any {
    return this.chamadaService.getTurmasProfessor(this.professorSelecionado)
      .then(turmaDisciplinas => {
        this.turmaDisciplinaSelecionada = null;
        this.turmaDisciplinas = turmaDisciplinas
        .map(p => ({ label: p.turmaDisciplina, value: p.codigo }));
      }
    )
      .catch(erro => this.errorHandler.handle(erro));
  }


  pesquisar(form: FormControl) {
    const chamada = new ChamadaPesquisa();
    chamada.codigoProfessor = this.professorSelecionado;
    chamada.codigoDisciplinaTurma= this.turmaDisciplinaSelecionada;
    chamada.dataIni = this.value;
    chamada.dataFim = this.value2;
    this.chamadaService.pesquisaChamada(chamada)
        .then(alunos => {
          
        }).catch(erro => this.errorHandler.handle(erro));
  }


}
