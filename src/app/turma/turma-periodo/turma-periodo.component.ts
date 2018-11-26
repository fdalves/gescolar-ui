import { TurmaService } from './../turma.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-turma-periodo',
  templateUrl: './turma-periodo.component.html',
  styleUrls: ['./turma-periodo.component.css']
})
export class TurmaPeriodoComponent implements OnInit {


  @Input()
  codigoTurma: number;

  periodos = [];
  segunda = [];
  terca = [];
  quarta = [];
  quinta = [];
  sexta = [];
  sabado = [];

  constructor(private turmaService: TurmaService) { }

  ngOnInit() {
    console.log(this.codigoTurma);
    this.initPeriodos();
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

        console.log('entrou..xxxxxxx');
        console.log(this.periodos);
      })
      .catch(erro => console.log(erro));
  }

}
