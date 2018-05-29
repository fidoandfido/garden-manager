import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '../model/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private dataSerivce: DataService) { }

  dataArray: Data[];

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.dataSerivce.getData().subscribe( (value: Data[]) => this.dataArray = value );
  }

}
