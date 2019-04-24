import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../professores/professor.service';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ChamadaService } from '../chamada.service';
import { Aluno, ChamadaPesquisa } from '../../core/model';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-chamada-pesquisa',
  templateUrl: './chamada-pesquisa.component.html',
  styleUrls: ['./chamada-pesquisa.component.css']
})
export class ChamadaPesquisaComponent implements OnInit {

  value: Date = new Date();
  value2: Date = new Date();
  pt: any;
  professores: any;
  professorSelecionado: any;
  disableProf = false;
  turmaDisciplinas: any;
  turmaDisciplinaSelecionada: any;
  chamadas = []; 
  turmaDisciplinaFiltro: any;

  constructor(private authService: AuthService,
    private professorService: ProfessorService,
    private errorHandler: ErrorHandlerService,
    private chamadaService: ChamadaService,
    private route: ActivatedRoute) { }

    
  ngOnInit() {

    const professorSelecionado = this.route.snapshot.params['professorSelecionado'];
    const turmaDisciplinaSelecionada = this.route.snapshot.params['turmaDisciplinaSelecionada'];
    const data = this.route.snapshot.params['date'];

    

    this.carregaProf();
    if (this.authService.jwtPayload.tipoUsuario.descTipoUsuario === 'PROFESSOR') {
      this.disableProf = true;
      this.professorSelecionado = this.authService.jwtPayload.codigoProfessor;
      this.carregarTurmaDisciplina();
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



    if (professorSelecionado && turmaDisciplinaSelecionada && data
      && ( professorSelecionado  !== "undefined")  
        && (turmaDisciplinaSelecionada  !== "undefined")
        && (data  !== "undefined") ){
    console.log('nao podia entrat');      

      this.professorSelecionado = professorSelecionado;
      
      this.turmaDisciplinaSelecionada = turmaDisciplinaSelecionada;
      this.turmaDisciplinaFiltro = turmaDisciplinaSelecionada
      this.carregarTurmaDisciplina();
      this.value.setTime(data);
      this.value2.setTime(data);
      this.pesquisar(null);
    }

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
        this.chamadas = []; 
        this.turmaDisciplinas = turmaDisciplinas.map(p => ({ label: p.turmaDisciplina, value: p.codigo }));
        if (this.turmaDisciplinaFiltro) {
          this.turmaDisciplinaSelecionada = this.turmaDisciplinaFiltro;
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  pesquisar(form: FormControl) {
    const chamada = new ChamadaPesquisa();
    chamada.codigoProfessor = this.professorSelecionado;
    chamada.codigoDisciplinaTurma= this.turmaDisciplinaSelecionada;
    chamada.dataIni = this.value;
    chamada.dataFim = this.value2;
    this.chamadaService.pesquisaChamada(chamada)
        .then(chamadas => {
          this.chamadas =  chamadas;
        }).catch(erro => this.errorHandler.handle(erro));
  }

  changeDate() {
    if (this.value && this.value2) {
        if (this.value > this.value2) {
          this.value2 = null;
          this.errorHandler.handle('Data inicinal não pode ser maior que data final');
        }
    }
  }

}
