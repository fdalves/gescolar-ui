import { GescolarHttp } from './../seguranca/gescolar-http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Aluno, Responsavel } from './../core/model';



export class AlunoFiltro {
  nome: string;
  matricula: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AlunosService {

  alunoUrl: string;

  constructor(private http: GescolarHttp) {
    this.alunoUrl = `${environment.apiUrl}/alunos`;
  }

  pesquisar(filtro: AlunoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.matricula) {
      params = params.append('matricula', filtro.matricula);
    }

    return this.http.get<any>(`${this.alunoUrl}`, { params })
      .toPromise()
      .then(response => {
        const alunos = response.content;

        for (const aluno of alunos) {
          if (aluno.urlFoto === null) {
            aluno.urlFoto = environment.fotoAlunoDefault;
          }
      }

        const resultado = {
          alunos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.alunoUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.alunoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(aluno: Aluno, responsaveis: Responsavel []): Promise<Aluno> {
    aluno.responsaveis = responsaveis;
    return this.http.post<Aluno>(this.alunoUrl, aluno)
      .toPromise()
      .then(response => response);
  }

  atualizar(aluno: Aluno, responsaveis: Responsavel []): Promise<Aluno> {
    aluno.responsaveis = responsaveis;
    return this.http.put<Aluno>(`${this.alunoUrl}/${aluno.codigo}`, aluno)
      .toPromise()
      .then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<Aluno> {
    return this.http.get<Aluno>(`${this.alunoUrl}/${codigo}`)
      .toPromise()
      .then(response => response);
  }


  matriculaExistente(matricula: String, codigo: string): Promise<boolean> {
    let params = new HttpParams();
    params = params.set('codigo', codigo);
    return this.http.get<boolean>(`${this.alunoUrl}/matriculaExistente/${matricula}`, { params })
      .toPromise()
      .then(response => response);
  }

}
