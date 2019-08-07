import { ChamadaPesquisaComponent } from './chamada-pesquisa/chamada-pesquisa.component';
import { ChamadaCadastroComponent } from './chamada-cadastro/chamada-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChamadaAlunoComponent } from './chamada-aluno/chamada-aluno.component';

const routes: Routes = [
  {
    path: 'chamada',
    component: ChamadaPesquisaComponent
  },
  
  {
    path: 'chamadaAluno',
    component: ChamadaAlunoComponent
  },

  {
    path: 'chamada/nova',
    component: ChamadaCadastroComponent
   },
  {
    path: 'chamada/:codigo',
    component: ChamadaCadastroComponent,
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ChamadaRoutingModule { }
