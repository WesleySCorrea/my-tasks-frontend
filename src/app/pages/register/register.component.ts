import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RegisterTaskComponent } from "../../components/register-task/register-task.component";

@Component({
  selector: 'app-register',
  imports: [NavbarComponent, RegisterTaskComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
