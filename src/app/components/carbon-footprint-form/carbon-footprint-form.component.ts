import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-carbon-footprint-form',
  standalone: true,
  imports: [ReactiveFormsModule  ],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.css'
})
export class CarbonFootprintFormComponent implements OnInit{
  
  form = FormGroup;

  constructor(private formBuilder : FormBuilder) {

  }

  ngOnInit(): void {
   
  }

}
