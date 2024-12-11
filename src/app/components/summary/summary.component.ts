import { Component } from '@angular/core';
import { CarbonFootprintComponent } from "../carbon-footprint/carbon-footprint.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CarbonFootprintComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
