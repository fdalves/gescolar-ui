import { TurmaService } from './../turma.service';
import { GrowMessageService } from './../../shared/grow-message.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-turma-cadastro',
  templateUrl: './turma-cadastro.component.html',
  styleUrls: ['./turma-cadastro.component.css']
})
export class TurmaCadastroComponent implements OnInit {

  formulario: FormGroup;
  series = [];
  turnos = [];
  periodos = [{nome: 'Segunda', value: 'SEGUNDA', quant: 5 },
              {nome: 'Terça', value: 'TERCA', quant: 5 },
              {nome: 'Quarta', value: 'TERCA', quant: 5 },
              {nome: 'Quinta', value: 'TERCA', quant: 5 },
              {nome: 'Sexta', value: 'TERCA', quant: 5 },
              {nome: 'Sábado', value: 'TERCA', quant: 5 }];

  quantDiasSemana = 5;
  diasSem: SelectItem [];

  constructor( private errorHandler: ErrorHandlerService,
                private route: ActivatedRoute,
                private router: Router,
                private title: Title,
                private messageService: GrowMessageService,
                private fb: FormBuilder,
                private turmaService: TurmaService) { }

  ngOnInit() {

    this.quantDiasSemana = 5;
    this.diasSem = [
      {label: '5 dias de Aula Por Semana', value: 5},
      {label: '6 dias de Aula Por Semana', value: 6}];

    this.verificaDias();

    const codigoTurma = this.route.snapshot.params['codigo'];
    this.configuraFormulario();
    this.title.setTitle('Turma');


    if (codigoTurma) {
      this.carregarTurma(codigoTurma);
    }

    this.initSeries();
    this.initTurno();

  }

  verificaDias() {
    if (this.quantDiasSemana === 5) {
      this.periodos.splice(5);
    }
  }

  configuraFormulario() {
    this.formulario = this.fb.group({
      'codigo': [],
      'nome': new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      'serie': new FormControl('', Validators.compose([Validators.required])),
      'turno': new FormControl('', Validators.compose([Validators.required])),
      'sala': [],
      'vagas': [],
      'quantidadeDiasSemana': 5,

    });
  }

  carregarTurma(codigo: number) {
    this.turmaService.buscarPorCodigo(codigo)
      .then(turma => {
        this.formulario.patchValue(turma);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarTituloEdicao() {
    this.title.setTitle(`Turma: ${this.formulario.get('nome').value}`);
  }


  public initSeries() {
    return this.turmaService.listarTodasSeries()
    .then(series => {
      this.series = series;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  public initTurno() {
    this.turnos[0] = {label: 'Manhã', value: 'MANHA' };
    this.turnos[1] = {label: 'Tarte', value: 'TARDE' };
    this.turnos[2] = {label: 'Noite', value: 'NOITE' };
  }

}
