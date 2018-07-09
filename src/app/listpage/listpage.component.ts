import { ReadFileService } from './../shared/read-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styleUrls: ['./listpage.component.css']
})
export class ListpageComponent implements OnInit {
  private customerList: ICustomer[];
  constructor(private readFileService: ReadFileService) { }

  ngOnInit() {
    this.readFileService.readFile((data:ICustomer[])=>{this.customerList = data;}) ;
  }
}
