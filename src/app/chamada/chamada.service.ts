import { HttpParams, HttpHeaders } from '@angular/common/http';
import { GescolarHttp } from '../seguranca/gescolar-http';


import { URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';


export class ChamadaFiltro {
  data: Date;
  codigoTurmaDiciplina: number;
}

@Injectable()
export class ChamadaService {

  chamadaUrl: string;

  constructor(private http: GescolarHttp) {
    this.chamadaUrl = `${environment.apiUrl}/chamada`;
  }

  getTurmasProfessor(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.chamadaUrl}/getTurmasProfessor/${codigo}`)
      .toPromise();
  }

  getAlunos(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.chamadaUrl}/getAlunos/${codigo}`)
      .toPromise();
  }

  getPeriodos(date: Date, codigoTurmaDisciplina: number): Promise<any> {
    const chamada = new ChamadaFiltro();
    chamada.codigoTurmaDiciplina = codigoTurmaDisciplina;
    chamada.data = date;
    console.log(chamada);
    return this.http.post<any>(`${this.chamadaUrl}/getPeriodos`, chamada)
      .toPromise();
  }


}
