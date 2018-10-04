import { HttpParams } from '@angular/common/http';
import { GescolarHttp } from './../seguranca/gescolar-http';

import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Turma } from './../core/model';

export class TurmaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class TurmaService {

  turmaUrl: string;

  constructor(private http: GescolarHttp) {
    this.turmaUrl = `${environment.apiUrl}/turmas`;
  }

  pesquisar(filtro: TurmaFiltro): Promise<any> {

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.turmaUrl}`, { params })
      .toPromise()
      .then(response => {

        const turmas = response.content;

        const resultado = {
          turmas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.turmaUrl)
      .toPromise().then(response => response.content);
  }

  listarTodasSeries(): Promise<any> {
    return this.http.get<any>(`${this.turmaUrl}/series`)
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.turmaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(turma: Turma): Promise<Turma> {
    return this.http.post<Turma>(this.turmaUrl, turma)
      .toPromise();
  }

  atualizar(turma: Turma): Promise<Turma> {
    return this.http.put<Turma>(`${this.turmaUrl}/${turma.codigo}`, turma)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Turma> {
    return this.http.get<Turma>(`${this.turmaUrl}/getTurma/${codigo}`)
      .toPromise();
  }


}
