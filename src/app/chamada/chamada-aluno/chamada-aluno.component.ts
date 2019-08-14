import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ChamadaService } from '../chamada.service';
import { Aluno, ChamadaPesquisa } from '../../core/model';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AlunosService } from '../../alunos/alunos.service';


@Component({
  selector: 'app-chamada-aluno',
  templateUrl: './chamada-aluno.component.html',
  styleUrls: ['./chamada-aluno.component.css']
})
export class ChamadaAlunoComponent implements OnInit {

  value: Date = new Date();
  value2: Date = new Date();
  pt: any;
  alunos: any;
  alunoSelecionado: any;
  disableAluno = false;
  disableDisciplina = true
  disciplinas: any;
  disciplinaSelecionada: any;
  chamadas = []; 
  turmaDisciplinaFiltro: any;
  
  
  constructor(private authService: AuthService,
    private alunoService: AlunosService,
    private errorHandler: ErrorHandlerService,
    private chamadaService: ChamadaService,
    private route: ActivatedRoute) { }

    ngOnInit() {

      
      this.carregaAluno();
      if (this.authService.jwtPayload.tipoUsuario.descTipoUsuario === 'ALUNO_RESPONSSAVEL') {
        this.disableAluno = true;
        this.alunoSelecionado = this.authService.jwtPayload.codigoProfessor;
        this.disableDisciplina = false; 
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
     
  
    }


    carregaAluno(): any {
      return this.alunoService.listarTodas()
        .then(alunos => {
          this.disableDisciplina = false; 
          this.alunos = alunos
            .map(a => ({ label: a.nome, value: a.codigo }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    carregarTurmaDisciplina(): any {
      return this.chamadaService.buscarDisciplinasAluno(this.alunoSelecionado)
        .then(turmaDisciplinas => {
          
          this.disciplinas = turmaDisciplinas.map(d => 
            ({ label: d.nome, value: d.codigo }));
            this.disciplinas.push({ label: "Todas", value: "%" })
        })
        .catch(erro => this.errorHandler.handle(erro));
    }


    pesquisar(form: FormControl) {
      const chamada = new ChamadaPesquisa();
      chamada.codigoProfessor = this.alunoSelecionado;
     // chamada.codigoDisciplinaTurma= this.turmaDisciplinaSelecionada;
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
