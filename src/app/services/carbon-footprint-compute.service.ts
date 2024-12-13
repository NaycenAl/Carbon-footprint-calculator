import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Travel2 } from '../models/travel';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private travels: Travel2[] = [];
  public distanceKm! : number;
  public Km100Consumption! : number;
  public totalConsumption?: number;
  public quantityCo2Total! : number;
  public  travelType!: string;

  constructor(private apiService :ApiService) {

    
   }

   getTravels() {

    this.apiService.getTravelForUser1().subscribe({
      next: (response: Travel2[]) => {
        if (Array.isArray(response)) {
           
          this.travels = response; 
          console.log(this.travels, 'travels')
        } else {
          console.error('Réponse incorrecte de l\'API', response);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages:', err);
      }
    });}

  



  calculateConsumption() {
    return this.totalConsumption = this.distanceKm/this.Km100Consumption;
     
   }


  //  getResumeVoyages(){
  
  //   let totalDistance = 0;
  //   let  averageConsumption = 0;
  //   let quantityCo2Total = 0;

  //   for(const travel of this.travels){
  //     totalDistance +=travel.distanceKm;
  //     averageConsumption += travel.Km100Consumption * travel.distanceKm;
  //     quantityCo2Total += travel.quantityCo2;
  //   }

  //   return {"totalDistance": totalDistance, "averageConsumption":averageConsumption / totalDistance , "quantityCo2Total": quantityCo2Total}
  // } 

}
