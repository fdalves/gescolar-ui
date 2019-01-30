import { HttpParams, HttpHeaders } from '@angular/common/http';
import { GescolarHttp } from './../seguranca/gescolar-http';


import { URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Professor } from './../core/model';

export class ProfessorFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ProfessorService {

  professorUrl: string;

  constructor(private http: GescolarHttp) {
    this.professorUrl = `${environment.apiUrl}/professores`;
  }

  pesquisar(filtro: ProfessorFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.professorUrl}`, { params })
      .toPromise()
      .then(response => {
        const professores = response.content;

        for (const prof of professores) {
          if (prof.urlFoto === null) {
            prof.urlFoto = environment.fotoProfessor;
          }
        }

        const resultado = {
          professores,
          total: response.totalElements
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.professorUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.professorUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(professor: Professor): Promise<Professor> {
    return this.http.post<Professor>(this.professorUrl, professor)
      .toPromise();
  }

  atualizar(professor: Professor): Promise<Professor> {
    return this.http.put<Professor>(`${this.professorUrl}/${professor.codigo}`, professor)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Professor> {
    return this.http.get<Professor>(`${this.professorUrl}/${codigo}`)
      .toPromise();
  }


  cpfExistente(cpf: string, codigo: string): Promise<boolean> {
    let params = new HttpParams();
    params = params.append('codigo', codigo);
    params = params.append('cpf', cpf);
    return this.http.get<boolean>(`${this.professorUrl}/cpfExistente`, { params })
      .toPromise();
  }

}
