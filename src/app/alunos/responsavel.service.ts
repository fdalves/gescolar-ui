import { HttpParams } from '@angular/common/http';
import { GescolarHttp } from './../seguranca/gescolar-http';


import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Responsavel } from '../core/model';


export class ResponsavelFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ResponsavelService {

  responsavelUrl: string;

  constructor(private http: GescolarHttp) {
    this.responsavelUrl = `${environment.apiUrl}/responsaveis`;
  }

  pesquisar(filtro: ResponsavelFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.responsavelUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const resp = response.content;

        const resultado = {
          resp,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.responsavelUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.responsavelUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(responsavel: Responsavel): Promise<Responsavel> {
    return this.http.post<Responsavel>(this.responsavelUrl, responsavel)
      .toPromise()
      .then(response => response);
  }

  atualizar(responsavel: Responsavel): Promise<Responsavel> {
    return this.http.put<Responsavel>(`${this.responsavelUrl}/${responsavel.codigo}`, responsavel)
      .toPromise()
      .then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<Responsavel> {
    return this.http.get<Responsavel>(`${this.responsavelUrl}/${codigo}`)
      .toPromise()
      .then(response => response);
  }


  cpfExistente(cpf: string, codigo: string): Promise<boolean> {
    const params = new URLSearchParams();
    params.set('codigo', codigo);
    params.set('cpf', cpf);
    return this.http.get<boolean>(`${this.responsavelUrl}/cpfExistente`, { search: params })
      .toPromise()
      .then(response => response);
  }

}
