import { Component, Injectable } from '@angular/core';
import { CarbonFootprintComputeService } from '../../services/carbon-footprint-compute.service';
import { ApiService } from '../../services/api.service';
import {  HttpClientModule } from '@angular/common/http';
import {  } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { Travel2 } from '../../models/travel';

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [HttpClientModule, JsonPipe],
  providers : [ApiService, CarbonFootprintComputeService],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})

export class CarbonFootprintComponent {

  travels: Travel2[] = [];
  public distanceKm!: number;
  public Km100Consumption!: number;
  public quantityCo2Total! : number;

constructor(private carbonFootprintCompute : CarbonFootprintComputeService, private apiService :  ApiService){
 
}
ngOnInit() {
  this.getTravels();  // Appeler la méthode pour récupérer les voyages
  this.distanceKm = this.carbonFootprintCompute.distanceKm;
  this.Km100Consumption = this.carbonFootprintCompute.Km100Consumption;
}


getTravels(): void {
  this.apiService.getTravelForUser1().subscribe({
    next: (response: Travel2[]) => {
      this.travels = response;  // Assignation de la réponse à travels
      console.log(this.travels); // Vérification dans la console
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des voyages:', err);  // Gestion d'erreur
    }
  });
}




calculateConsumption() {
  this.carbonFootprintCompute.calculateConsumption();
  this.distanceKm = this.carbonFootprintCompute.distanceKm;
}



}
