import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CarbonFootprintComputeService } from '../../services/carbon-footprint-compute.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-carbon-footprint-form',
  standalone: true,
  
  imports: [HttpClientModule, ReactiveFormsModule],
  providers : [ApiService, CarbonFootprintComputeService],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.css'
})
export class CarbonFootprintFormComponent implements OnInit{

  
  public form! : FormGroup;
  public isSubmited: boolean = false;

  constructor(private formBuilder : FormBuilder, private router : Router, private carbonFootPrintService : CarbonFootprintComputeService, private apiService : ApiService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      distanceKm : new FormControl(null, [Validators.required, Validators.min(1)]),
      Km100Consumption : new FormControl(null),
      date : new FormControl(null, [Validators.required, this.dateValidator]),
      travelType : new FormControl(null, [Validators.pattern("(Car|Train|Plane)"), () => this.travelTypeValidator])
     });
  }

  
  public travelTypeValidator(control : AbstractControl) {

    const travelType = control.value;

    if(travelType == 'Car'){
      this.form.get('Km100Consumption')?.setValidators([Validators.required, Validators.min(1)])
    }
    else {
      this.form.get('Km100Consumption')?.clearValidators();
      this.form.get('Km100Consumption')?.setValue(0);
    }

    this.form.get('Km100Consumption')?.updateValueAndValidity()

    return null
  }
  
  public dateValidator(control: AbstractControl) {
    
    if (control && control.value) {
      if (new Date(control.value) > new Date()) {
        return { greaterThan : true }
      }
    }
    return null;
  }

  addTravel(travel: any) {



    
    this.apiService.calculC02({
      travelType: travel.travelType,
      distanceKm: travel.distanceKm,
      Km100Consumption: travel.Km100Consumption,
      typeCarburant: 'diesel',
    }).subscribe({
      next: quantityCo2 => {
      
        console.log({ travel, quantityCo2 });
      
        travel.distance = travel.distanceKm;
        travel.consommation =  travel.Km100Consumption;
        travel.travelType = travel.travelType
        travel.co2 = quantityCo2;
        this.apiService.addTravelForUser1(travel).subscribe({
          next: (response) => {
            console.log('Voyage ajouté avec succès', response);
           
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du voyage', err);
          }
        });
       
      },
      error: (err) => {
        console.error('Erreur lors du calcul du CO2:', err);
      }
    });
  }
   
  onSubmit() {
    this.isSubmited = true;
    if (this.form.valid){
      
       this.addTravel(this.form.value);
       this.router.navigate(['/summary']);
       this.isSubmited = false;
    }
    else{
      console.log("INVALID FORM !")
    }
  }

}

   