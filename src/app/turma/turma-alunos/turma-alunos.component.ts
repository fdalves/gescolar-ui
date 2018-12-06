import { AlunosService } from './../../alunos/alunos.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-turma-alunos',
  templateUrl: './turma-alunos.component.html',
  styleUrls: ['./turma-alunos.component.css']
})
export class TurmaAlunosComponent implements OnInit {

  @Input()
  codigoTurma: number;

  constructor(alunosService: AlunosService) {
  }

  ngOnInit() {
    if (this.codigoTurma) {
    }
  }

}
