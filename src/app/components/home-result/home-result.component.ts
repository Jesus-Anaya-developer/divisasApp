import { Component } from '@angular/core';
import { GraphComponent } from "./graph/graph.component";

@Component({
  selector: 'app-home-result',
  standalone: true,
  imports: [
    GraphComponent
  ],
  templateUrl: './home-result.component.html',
  styleUrl: './home-result.component.css'
})
export class HomeResultComponent {

}
