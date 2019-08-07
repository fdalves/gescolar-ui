import { Router } from '@angular/router';
import { Component, OnInit, Renderer } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

declare var FirebasePlugin: any

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {


  emAndamento = false;

  constructor(
    public renderer: Renderer,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.emAndamento = true;
    this.auth.login(usuario, senha)
      .then(() => {
        this.emAndamento = false;
        if (typeof FirebasePlugin !== "undefined") {
          this.getDeviceToken();
        } else {
            this.atualizaDevice("teste....")        
        }
        this.router.navigate(['/professores']);
      })
      .catch(erro => {
        this.emAndamento = false;
        this.errorHandler.handle(erro);
      });
  }


  atualizaDevice(token :any) {
    if (this.auth.jwtPayload.codigoUsuario) {
      this.auth.atualizaTokenDeviceId(this.auth.jwtPayload.codigoUsuario, token)
        .then(() => { });
    }
  }

  getDeviceToken() {
    alert('entrou...');
    this.renderer.listenGlobal('document', 'deviceready', () => {
      alert('entrou...2');
      FirebasePlugin.getToken((token) => {
        alert(token);
        this.atualizaDevice(token);
      });
    });
  }

}
