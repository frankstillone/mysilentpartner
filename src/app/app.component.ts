import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'silentpartner';
  constructor(
    public auth: FormioAuthService,
    public router: Router
  ) {
    this.auth.onLogin.subscribe(() => {
      this.router.navigate(['/']);
    });

    this.auth.onLogout.subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }
}
