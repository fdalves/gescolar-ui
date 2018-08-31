import { TurmaService } from './../turma.service';
import { GrowMessageService } from './../../shared/grow-message.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-turma-cadastro',
  templateUrl: './turma-cadastro.component.html',
  styleUrls: ['./turma-cadastro.component.css']
})
export class TurmaCadastroComponent implements OnInit {

  formulario: FormGroup;
  series = [];
  turnos = [];

  quantDiasSemana = 5;
  diasSem: SelectItem[];

  constructor(private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private messageService: GrowMessageService,
    private fb: FormBuilder,
    private turmaService: TurmaService) { }

  ngOnInit() {

    this.quantDiasSemana = 5;
    this.diasSem = [
      { label: '5 dias de Aula Por Semana', value: 5 },
      { label: '6 dias de Aula Por Semana', value: 6 }];
    const codigoTurma = this.route.snapshot.params['codigo'];
    this.configuraFormulario();
    this.title.setTitle('Turma');
    if (codigoTurma) {
      this.carregarTurma(codigoTurma);
    }
    this.initSeries();
    this.initTurno();
    this.addItem('Segunda', 'SEGUNDA', 5);
    this.addItem('Terça', 'TERCA', 5);
    this.addItem('Quarta', 'QUARTA', 5);
    this.addItem('Quinta', 'QUINTA', 5);
    this.addItem('Sexta', 'SEXTA', 5);
  }

  onChange(event: any) {
    if (this.formulario.get('quantidadeDiasSemana') &&
      this.formulario.get('quantidadeDiasSemana').value === 5 &&
      this.getPeriodos().controls.length === 6) {
      this.getPeriodos().controls.splice(5, 1);
    } else if (this.formulario.get('quantidadeDiasSemana') &&
      this.formulario.get('quantidadeDiasSemana').value === 6 &&
      this.getPeriodos().controls.length === 5) {
      this.addItem('Sábado', 'SABADO', 5);
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
      'periodos': this.fb.array([])
    });
  }

  createItem(nome: string, value: string, quant: number): FormGroup {
    return this.fb.group({
      nome: nome,
      value: value,
      quant: quant
    });
  }

  addItem(nome: string, value: string, quant: number): void {
    this.getPeriodos().push(this.createItem(nome, value, quant));
  }


  getPeriodos(): FormArray {
    return this.formulario.get('periodos') as FormArray;
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
    this.turnos[0] = { label: 'Manhã', value: 'MANHA' };
    this.turnos[1] = { label: 'Tarte', value: 'TARDE' };
    this.turnos[2] = { label: 'Noite', value: 'NOITE' };
  }

}
