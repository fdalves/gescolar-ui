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
  diasSem: SelectItem[];

  constructor(private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private messageService: GrowMessageService,
    private fb: FormBuilder,
    private turmaService: TurmaService) { }

  ngOnInit() {

    const codigoTurma = this.route.snapshot.params['codigo'];
    if (codigoTurma) {
      this.carregarTurma(codigoTurma);
    }


    this.diasSem = [
      { label: '5 dias de Aula Por Semana', value: 5 },
      { label: '6 dias de Aula Por Semana', value: 6 }];
    this.configuraFormulario();
    this.title.setTitle('Turma');
    this.initSeries();
    this.initTurno();
    this.addItem('Segunda', '1', 5);
    this.addItem('Terça', '2', 5);
    this.addItem('Quarta', '3', 5);
    this.addItem('Quinta', '4', 5);
    this.addItem('Sexta', '5', 5);

  }

  onChange(event: any) {
    console.log('entrou...');
    if (this.formulario.get('quantidadeDiasSemana') &&
      this.formulario.get('quantidadeDiasSemana').value === 5 &&
      this.getPeriodos().controls.length === 6) {
      this.getPeriodos().controls.splice(5, 1);
    } else if (this.formulario.get('quantidadeDiasSemana') &&
      this.formulario.get('quantidadeDiasSemana').value === 6 &&
      this.getPeriodos().controls.length === 5) {
      this.addItem('Sábado', '6', 5);
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


  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }


  salvar() {
    if (this.editando) {
      this.atualizarTurma();
    } else {
      this.adicionarTurma();
    }
  }
  atualizarTurma() {
    this.turmaService.atualizar(this.formulario.value)
      .then(turma => {
        this.formulario.patchValue(turma);

        this.messageService.addSucesso('Turma editada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarTurma() {
    console.log(this.formulario.value);

    this.turmaService.adicionar(this.formulario.value)
      .then(turmaAdicionada => {
        this.messageService.addSucesso('Turma adicionada com sucesso!');
        this.router.navigate(['/turmas', turmaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
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
