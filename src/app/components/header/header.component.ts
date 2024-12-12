import { Component, Input, input } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  
   username! : string;
   isUserAuthentificated! : boolean;

  constructor(private router : Router, private userService : UserService){
    
  }
  ngOnInit(){
    this.username= this.userService.getUserName();
    this.isUserAuthentificated = this.userService.isAuthentificated();
  }


  goToSummary() {
    this.router.navigate(['/summary'])
  }

  goToProfile(){
    this.router.navigate(['/profile', this.username])
  }

  logoutAndGoToHome() {
    this.userService.logout();
    this.router.navigateByUrl('');
    }
    
}
