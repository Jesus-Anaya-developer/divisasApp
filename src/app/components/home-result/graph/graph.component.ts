import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {

  @Input() graphLabel: any = {};
  @Input() graphLabelData: any = {};

  public chart: Chart | undefined;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getGraph(this.graphLabel, this.graphLabelData);
  }

  getGraph(graphLabel: any, graphLabelData: any) {
    // datos
    const data = {
      labels: graphLabel,
      datasets: [{
        label: 'Precio',
        data: graphLabelData,
        fill: false,
        borderColor: '',
        backgroundColor: '#223026',
        color: '',
        tension: 0.1
      }]
    };
    // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'line' as ChartType, // tipo de la gráfica
      data: data // datos
    });
  }
}
