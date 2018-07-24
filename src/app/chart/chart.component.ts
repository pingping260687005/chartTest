import { element } from 'protractor';
import { ReadFileService } from './../shared/read-file.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import * as G2 from '@antv/g2';
import * as c3 from 'c3';
import * as d3 from "d3";
import * as echarts from "echarts";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private chart;
  private dv;
  @ViewChild("c1" , {read: ElementRef}) c1;
  constructor(private readFileService: ReadFileService) { }

  ngOnInit() {
    //var _DataSet = G2.DataSet, DataView = _DataSet.DataView;
    this.readFileService.readFile((data: ICustomer[]) => {
      //this.drawChart2(data);// c3
      this.drawChart3(data);// echarts
    });
  }

  /**
   * using c3 frame work
   * @param data 
   */
  private drawChart2(data: ICustomer[]) {
    let all = [];
    data.forEach(customer=>{
     let deptObj = all.find(obj=>obj[0]===customer.department);
     if (deptObj) {
       deptObj.push(1);
     }else{
       deptObj =[];
       deptObj.push(customer.department);
       deptObj.push(1);
       all.push(deptObj);
     }
    
    });

    var chart = c3.generate({
      bindto: '#c1',
      data: {
        // iris data from R
        columns: all,
        type: 'pie',
        onmouseover: function (d, element) {
          alert("ddd");
        },
        onclick: function () {
          alert("click");
        }
      },
      pie: {
        label: {
          show: true,
          format: function (value: number, ratio: number, id: string) {
            return id + ":    " + ratio * 100 + "% ";
          }
        }
      },

      legend: {
        show: true
      },
      size: {
        width: 600,
        height: 600
      },
      tooltip: {
        /*format:  (value: any, ratio: number, id: string, index: number) => {
           return "ddd";
         }*/
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

  /**
   * using echarts 
   * @param data 
   */
  private drawChart3(data: ICustomer[]){
    let all = [];
    let depts=[];
    data.forEach(customer=>{
    if(depts.indexOf(customer.department)===-1){
        depts.push(customer.department);
      }
     let deptObj = all.find(obj=>obj["name"]===customer.department);
     if (deptObj) {
       deptObj["value"]++;
     }else{
       deptObj ={
        name: customer.department,
        value:1
       };
       all.push(deptObj);
     }
    });


   let option = {
      title : {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient : 'vertical',
          x : 'left',
          data: depts//data.map(x=> x.department)
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                  show: true, 
                  type: ['pie', 'funnel'],
                  option: {
                      funnel: {
                          x: '25%',
                          width: '50%',
                          funnelAlign: 'left',
                          max: 1548
                      }
                  }
              },
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      series : [
          {
              name:'访问来源',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: all
              /*[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ]*/
          }
      ],
      color:[
        "red", "green","yellow","blue"
      ]
  };

  
         //初始化echarts实例
        var myChart = echarts.init(this.c1.nativeElement);
        var ele = this.c1.nativeElement;
           
        //使用制定的配置项和数据显示图表
        myChart.setOption(option);             
  }
}
