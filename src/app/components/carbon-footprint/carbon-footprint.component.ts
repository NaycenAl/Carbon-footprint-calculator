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


addTravel(travel: any) {
  const distance = Math.ceil(Math.random() * 1000);
  const consumption = Math.ceil(Math.random() * 10);
  console.log(distance)
  // Appeler calculc01 pour obtenir la valeur de CO2
  this.apiService.calculC02({
    travelType: 'car',
    distanceKm: distance,
    Km100Consumption: consumption,
    typeCarburant: 'jet fuel',
  }).subscribe({
    next: quantityCo2 => {
     
      console.log({ travel, quantityCo2 });
      this.carbonFootprintCompute.addTravel({ ...travel, quantityCo2 });

    },
    error: (err) => {
      console.error('Erreur lors du calcul du CO2:', err);
    }
  });
}


calculateConsumption() {
  this.carbonFootprintCompute.calculateConsumption();
  this.distanceKm = this.carbonFootprintCompute.distanceKm;
}

// calculateAverage(){
//  const resume= this.carbonFootprintCompute.getResumeVoyages();

//   this.distanceKm= resume.totalDistance;
//   this.Km100Consumption= resume.averageConsumption;
//   this.quantityCo2Total = resume.quantityCo2Total;
// }

}
