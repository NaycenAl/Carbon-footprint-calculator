import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  public username? : string | null;

  constructor(private route: ActivatedRoute){

  }

  public ngOnInit() : void {
   if(this.route.snapshot.paramMap.has('usemname'))   {
        this.username = this.route.snapshot.paramMap.get('usemname');
    }
  }



}
