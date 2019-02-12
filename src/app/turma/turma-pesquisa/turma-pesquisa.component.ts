import { AuthService } from './../../seguranca/auth.service';
import { GrowMessageService } from './../../shared/grow-message.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { TurmaFiltro, TurmaService } from './../turma.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-turma-pesquisa',
  templateUrl: './turma-pesquisa.component.html',
  styleUrls: ['./turma-pesquisa.component.css']
})
export class TurmaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new TurmaFiltro();
  turmas = [];
  @ViewChild('tabela') grid;

  constructor(
    private authService: AuthService,
    private title: Title,
    private turmaService: TurmaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: GrowMessageService) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Trumas');
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.turmaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.turmas = resultado.turmas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(turma: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(turma);
      }
    });
  }

  excluir(turma: any) {
    this.turmaService.excluir(turma.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

       this.messageService.addSucesso('Turma excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
