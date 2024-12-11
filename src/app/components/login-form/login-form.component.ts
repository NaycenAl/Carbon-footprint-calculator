import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  public username? : string;
  public password? : string ;
 public usernameError! : string | null;

  constructor(private userService : UserService) {

  }

  checkLoginLength(): void {
    if (this.username!.length < 3) {
      this.usernameError = 'Le login doit faire au moins 3 caractères.';
    } else {
      this.usernameError = null;
    }
  }

onSubmit() {
  console.log(this.username)
  console.log(this.password)
  
  if(!this.usernameError){
  this.userService.login(this.username!, this.password!);}

}

}
