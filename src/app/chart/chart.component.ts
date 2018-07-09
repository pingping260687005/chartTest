import { ReadFileService } from './../shared/read-file.service';
import { Component, OnInit } from '@angular/core';
//import * as G2 from '@antv/g2';
import * as c3 from 'c3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private chart;
  constructor(private readFileService: ReadFileService) { }

  ngOnInit() {
     this.readFileService.readFile((data: ICustomer[]) => {
      let all = [];
      data.forEach(customer => {
        let deptObj = all.find(obj => obj[0] === customer.department);
        if (deptObj) {
          deptObj.push(1);
        } else {
          deptObj = [];
          deptObj.push(customer.department);
          deptObj.push(1);
          all.push(deptObj);
        }

      });
      console.log(all);
      this.drawChart(all);
    });
  }

  private drawChart(data:any[]) {
    var chart = c3.generate({
      bindto: '#c1',
      data: {
        // iris data from R
        columns: data,
        type: 'pie'
      },
      pie: {
        label: {
          show: true,
          format:  (value: number, ratio: number, id: string) =>{
            return id + ":   " +  this.toDecimal(ratio* 100)  + "% ";
          }
        } 
      },
      legend: {
        show: true
      },
      size: {
        width: 600,
        height: 600
      }
    });
    // legend
    /*d3.select('#c1').insert('div', '.chart').attr('class', 'legend').selectAll('span')
     .data(['data1', 'data2', 'data3'])
   .enter().append('span')
     .attr('data-id', function (id) { return id; })
     .html(function (id) { return id; })
     .each(function (id) {
         d3.select(this).style('background-color', chart.color(id));
     })
     .on('mouseover', function (id) {
         chart.focus(id);
     })
     .on('mouseout', function (id) {
         chart.revert();
     })
     .on('click', function (id) {
         chart.toggle(id);
     });
  
  setTimeout(function () {
     chart.load({ 
       columns: [
         ["肿瘤科", 5],
         ["呼吸内科", 2],
         ["胸外科", 2],
         ["泌尿科", 1]
       ]
     });
   }, 1500); */

  }
  private toDecimal(x):number{
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
  } 
}
