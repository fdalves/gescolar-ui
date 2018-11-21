import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-turma-periodo',
  templateUrl: './turma-periodo.component.html',
  styleUrls: ['./turma-periodo.component.css']
})
export class TurmaPeriodoComponent implements OnInit {


  @Input()
  codigoTurma: number;

  constructor() { }

  ngOnInit() {

    console.log('entrou..');
    console.log(this.codigoTurma);
  }

}
