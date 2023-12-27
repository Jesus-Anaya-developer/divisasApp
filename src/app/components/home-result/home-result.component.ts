import { Component, Input } from '@angular/core';
import { GraphComponent } from "./graph/graph.component";
import { SearchComponent } from "../search/search.component";
import { HttpClient } from '@angular/common/http';

import { ExchangeDataService } from "../../services/exchange-data.service";

@Component({
  selector: 'app-home-result',
  standalone: true,
  imports: [
    GraphComponent,
    SearchComponent
  ],
  templateUrl: './home-result.component.html',
  styleUrl: './home-result.component.css'
})
export class HomeResultComponent {

  @Input() divisaMonto: string = ''
  @Input() divisaOrigen: string = '';
  @Input() divisaDestino: string = '';
  @Input() ErrorMessage: string = '';

  // variables para el consumo de la API
  monto: string = '';
  origen: string = '';
  destino: string = '';
  res: any = {};

  // variables para el layout
  montoHome: string = '';
  origenHome: string = '';
  destinoHome: string = '';
  montoDestinoHome: string = '';
  montoBy1: string = '';
  montoBy1Invert: string = '';

  // variables para el grafico
  graphData: any = {};
  graphAlert: boolean = false;
  graphLabel: any = [];
  graphLabelData: any = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getDivisas(this.divisaMonto, this.divisaOrigen, this.divisaDestino);
  }

  constructor(private _exchangeDataService: ExchangeDataService,
    private http: HttpClient) {
  }

  getDivisas(divisaMonto: string, divisaOrigen: string, divisaDestino: string) {

    this.monto = divisaMonto;
    this.origen = divisaOrigen.substring(0, 3);
    this.destino = divisaDestino.substring(0, 3);

    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${this.origen}&from=${this.destino}&amount=${this.monto}`;
    const urlBy1 = `https://api.apilayer.com/exchangerates_data/convert?to=${this.origen}&from=${this.destino}&amount=1`;
    const urlBy1Invert = `https://api.apilayer.com/exchangerates_data/convert?to=${this.destino}&from=${this.origen}&amount=1`;
    const headers = this._exchangeDataService.headers;

    this.http.get(url, { headers }).subscribe({
      next: result => {
        this.res = result;
        this.montoHome = this.res.query.amount;
        this.origenHome = this.res.query.from;
        this.destinoHome = this.res.query.to;
        this.montoDestinoHome = this.res.result;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });

    //Monto para 1 unidad de la divisa destino
    this.http.get(urlBy1, { headers }).subscribe({
      next: result => {
        this.res = result;
        this.montoBy1 = this.res.result;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });

    //Monto para 1 unidad de la divisa origen
    this.http.get(urlBy1Invert, { headers }).subscribe({
      next: result => {
        this.res = result;
        this.montoBy1Invert = this.res.result;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });

    // Logicap para grafica
    let dateToday = new Date();
    dateToday.setDate(dateToday.getDate() - 1);
    let dateResta = new Date();
    dateResta.setFullYear(dateResta.getFullYear() - 1);

    this.getGraphData(this.origen, this.destino, dateResta.toISOString().split('T')[0], dateToday.toISOString().split('T')[0]);
  }

  getGraphData(divisaOrigen: string, divisaDestino: string, start_date: string, end_date: string) {

    const from = divisaOrigen;
    const to = divisaDestino;
    const start = start_date;
    const end = end_date;

    const url = `https://api.apilayer.com/exchangerates_data/timeseries?base=${from}&symbols=${to}&start_date=${start}&end_date=${end}`;
    const headers = this._exchangeDataService.headers;

    this.http.get(url, { headers }).subscribe({
      next: result => {

        this.graphData = result;
        const graphDataArray = Object.entries(this.graphData.rates);

        graphDataArray.map((item: any) => {
          this.graphLabel.push(item[0]);
          this.graphLabelData.push(item[1][to]);
        });

        this.graphAlert = true;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });

  }

}
