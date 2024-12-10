import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private travels: any [];
  public distanceKm! : number;
  public Km100Consumption! : number;
  public totalConsumption?: number;


  constructor() {

    this.travels = [
      { distanceKm: 50, Km100Consumption: 5, quantityCo2 : 5.75 },
      { distanceKm: 150, Km100Consumption: 6, quantityCo2 : 20.7 },
      { distanceKm: 250, Km100Consumption: 7 , quantityCo2 : 40.25},
      { distanceKm: 350, Km100Consumption: 8, quantityCo2 : 64.4 },
      { distanceKm: 450, Km100Consumption: 9 , quantityCo2 : 93.15}
  ];
   }


  getTravels() {
    return this.travels;
   }

  addTravel (travel : any ){
    this.travels.push(travel)
   
  }


  calculateConsumption() {
    return this.totalConsumption = this.distanceKm/this.Km100Consumption;
     
   }

   add100KmToTheDistance() {
     return this.distanceKm = this.distanceKm + 100;
   }
 

  

 
   
 
   getResumeVoyages(){
  
    let totalDistance = 0;
    let  averageConsumption = 0;
    let quantityCo2Total = 0;

    for(const travel of this.travels){
      totalDistance +=travel.distanceKm;
      averageConsumption += travel.Km100Consumption * travel.distanceKm;
      quantityCo2Total += travel.quantityCo2;
    }

    return {"totalDistance": totalDistance, "averageConsumption":averageConsumption / totalDistance , "quantityCo2Total": quantityCo2Total}
  } 

}
