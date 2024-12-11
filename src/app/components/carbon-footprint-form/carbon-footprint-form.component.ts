import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-carbon-footprint-form',
  standalone: true,
  imports: [ReactiveFormsModule  ],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.css'
})
export class CarbonFootprintFormComponent implements OnInit{

  
  public form! : FormGroup;
  public isSubmited: boolean = false;

  constructor(private formBuilder : FormBuilder) {

  }

  ngOnInit(): void {
   this.form = new FormGroup({
    att1 : new FormControl('', [Validators.required]),

   });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.valid){
       console.log(this.form.value);
    }
    else{

    }
  }

}
