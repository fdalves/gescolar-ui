import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessoresRoutingModule } from './professores-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';
import { ProfessorPesquisaComponent } from './professor-pesquisa/professor-pesquisa.component';
import { DataTableModule, TooltipModule, InputMaskModule, OrderListModule, ProgressSpinnerModule } from 'primeng/primeng';


import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'rxjs/add/operator/toPromise';
import {DataGridModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {PanelMenuModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import { CpfCnpjModule } from 'ng2-cpf-cnpj';


@NgModule({
  imports: [
    CommonModule,
    ProfessoresRoutingModule,
    CpfCnpjModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    InputMaskModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ButtonModule,
    DataGridModule,
    DataListModule,
    DataScrollerModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    GrowlModule,
    InputMaskModule,
    InputTextModule,
    PanelMenuModule,
    RadioButtonModule,
    TableModule,
    ProgressSpinnerModule,

  ],
  declarations: [ProfessorCadastroComponent,
    ProfessorPesquisaComponent]
})
export class ProfessoresModule { }
