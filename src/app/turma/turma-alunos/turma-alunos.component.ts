import { ErrorHandlerService } from './../../core/error-handler.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { AlunosService, AlunoFiltro } from './../../alunos/alunos.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-turma-alunos',
  templateUrl: './turma-alunos.component.html',
  styleUrls: ['./turma-alunos.component.css']
})
export class TurmaAlunosComponent implements OnInit {

  @Input()
  codigoTurma: number;

  totalRegistros = 0;
  filtro = new AlunoFiltro();
  alunos = [];

  constructor(private alunosService: AlunosService,
    private errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
    if (this.codigoTurma) {
      this.pesquisar(0);
    }
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    if (this.codigoTurma) {
    this.alunosService.pesquisarPorTurma(this.filtro, this.codigoTurma)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.alunos = resultado.alunos;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
