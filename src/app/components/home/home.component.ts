import { Component } from '@angular/core';
import { CarbonFootprintComponent } from "../carbon-footprint/carbon-footprint.component";
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers : [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ;
  constructor(private router : Router, private userService : UserService, private route : ActivatedRoute, ){

  }


  ngAfterContentChecked(){
    if(this.route.snapshot.queryParamMap.has('error')){
      const error= this.route.snapshot.queryParamMap.get('error');
     }
  }

  login(){
    this.userService.login('JP','m12');
    this.router.navigate(['/summary'])
  }

  goToaddTravel(){
    this.router.navigate(['/add-travel'])
  }
}
