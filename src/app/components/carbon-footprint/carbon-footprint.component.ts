import { Component, Injectable } from '@angular/core';
import { CarbonFootprintFormComponent } from "../carbon-footprint-form/carbon-footprint-form.component";
import { CarbonFootprintResultComponent } from "../carbon-footprint-result/carbon-footprint-result.component";
import { NgClass } from '@angular/common';
import { CarbonFootprintComputeService } from '../../services/carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})

export class CarbonFootprintComponent {

  public travels?: any[];
  public distanceKm!: number;
  public Km100Consumption!: number;
  public quantityCo2Total! : number;

constructor(private carbonFootprintCompute : CarbonFootprintComputeService){

}

ngOnInit() {
 
    this.travels = this.carbonFootprintCompute.getTravels();
    this.distanceKm = this.carbonFootprintCompute.distanceKm;
    this.Km100Consumption = this.carbonFootprintCompute.Km100Consumption;

    this.calculateAverage()
}

addTravel() {
  const distance = Math.ceil(Math.random() * 1000)
  const consumption = Math.ceil(Math.random() * 10)
  const quantityCo2= distance * consumption / 100 * 2.3;
  this.carbonFootprintCompute.addTravel({distanceKm : distance, Km100Consumption : consumption, quantityCo2: quantityCo2})
  this.calculateAverage();


}

add100Km() {
  this.carbonFootprintCompute.add100KmToTheDistance();
  this.distanceKm = this.carbonFootprintCompute.distanceKm;
}
 
calculateConsumption() {
  this.carbonFootprintCompute.calculateConsumption();
  this.distanceKm = this.carbonFootprintCompute.distanceKm;
}

calculateAverage(){
 const resume= this.carbonFootprintCompute.getResumeVoyages();

  this.distanceKm= resume.totalDistance;
  this.Km100Consumption= resume.averageConsumption;
  this.quantityCo2Total = resume.quantityCo2Total;
}

}
