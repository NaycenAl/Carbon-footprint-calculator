import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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
  public passwordError! : string | null;

  constructor(private router : Router, private userService : UserService) {

  }

  checkUsernameLength(): void {
    if (this.username!.length < 3) {
      this.usernameError = 'Username must be at least 3 characters long.'
    } 
    else {
      this.usernameError = null;
    }
  }

  checkPasswordLength(): void {
    if (this.password!.length < 3) {
      this.passwordError = 'Password must be at least 3 characters long.';
    } else {
      this.passwordError = null;
    }
  }

onSubmit() {
  this.checkUsernameLength();
  this.checkPasswordLength();


  if(!this.usernameError && !this.passwordError){
  this.userService.login(this.username!, this.password!);
  this.router.navigate([''])
}
  

}

}
