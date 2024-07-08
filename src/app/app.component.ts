import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastsContainer } from './components/toast/toasts-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent, NavBarComponent, ToastsContainer],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'form_project_frontend';
}
