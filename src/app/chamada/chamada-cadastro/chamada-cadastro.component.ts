import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProfessorService } from './../../professores/professor.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamada-cadastro',
  templateUrl: './chamada-cadastro.component.html',
  styleUrls: ['./chamada-cadastro.component.css']
})
export class ChamadaCadastroComponent implements OnInit {

  constructor(private authService: AuthService,
     private professorService: ProfessorService,
     private errorHandler: ErrorHandlerService) { }

  value: Date;
  pt: any;
  disableProf = false;
  professores: any;
  professorSelecionado: any;

  ngOnInit() {

    console.log(this.authService.jwtPayload);
    this.carregaProf();

    if (this.authService.jwtPayload.tipoUsuario.descTipoUsuario === 'PROFESSOR') {
      console.log('entoru...');
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

  salvar(form: FormControl) {}

}
