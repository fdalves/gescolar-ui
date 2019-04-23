import { CpfCnpjModule } from 'ng2-cpf-cnpj';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosPesquisaComponent } from './alunos-pesquisa/alunos-pesquisa.component';
import { AlunosCadastroComponent } from './alunos-cadastro/alunos-cadastro.component';
import { AlunosRoutingModule } from './alunos-routing.module';


import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, InputMaskModule, ProgressSpinnerModule } from 'primeng/primeng';


import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {AccordionModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';



@NgModule({
  imports: [
    CommonModule,
    AlunosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CpfCnpjModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    FormsModule,
    HttpModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    InputMaskModule,
    InputTextModule,
    RadioButtonModule,
    TableModule,
    ProgressSpinnerModule
    
  ],
  declarations: [AlunosPesquisaComponent, AlunosCadastroComponent]
})
export class AlunosModule { }
