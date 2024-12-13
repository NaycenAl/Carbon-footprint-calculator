import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule],
  providers:[ApiService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  public username? : string | null;
  public myCarbonfootPrint? : number;

  constructor(private route: ActivatedRoute, private apiService : ApiService){

  }

  public ngOnInit() : void {
   if(this.route.snapshot.paramMap.has('usemname'))   {
        this.username = this.route.snapshot.paramMap.get('usemname');
    }
    this.getUserCarbonFootprint()
  }

  getUserCarbonFootprint() {
    this.apiService.getUserCarbonFootprint().subscribe({
      next: (response:any) => {
        console.log(response); 
        this.myCarbonfootPrint = response.empreinteCarbone;
      },
    })
  }


}
