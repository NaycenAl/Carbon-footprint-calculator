import { Component } from '@angular/core';
import { CarbonFootprintFormComponent } from "../carbon-footprint-form/carbon-footprint-form.component";
import { CarbonFootprintResultComponent } from "../carbon-footprint-result/carbon-footprint-result.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, NgClass],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  public distanceKm! : number;
  public Km100Consumption! : number;
  public totalConsumption?: number;
  public travels!: any [];
 

  ngOnInit() {
    this.distanceKm= 150;
    this.Km100Consumption=3;
    this.travels = [
      { distanceKm: 50, Km100Consumption: 5 },
      { distanceKm: 150, Km100Consumption: 6 },
      { distanceKm: 250, Km100Consumption: 7 },
      { distanceKm: 350, Km100Consumption: 8 },
      { distanceKm: 450, Km100Consumption: 9 }
  ]
  }

  calculateConsumption() {
   return this.totalConsumption = this.distanceKm/this.Km100Consumption;
    
  }
  add100KmToTheDistance() {
    return this.distanceKm = this.distanceKm + 100;
  }

}
