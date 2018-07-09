import { Injectable } from '@angular/core';
import { promise } from 'protractor';
@Injectable()
export class ReadFileService {

  constructor() { }

  private ajax(url:string, method:string, data:any=null):Promise<any> {
    if(method==="GET"){
      return new Promise(function(resolve, reject){
        const handler = function() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
      } );
     }else{
      //post 
      return new Promise(function(resolve, reject){
        var xml = new XMLHttpRequest();
        xml.open('POST',url,true);
        xml.onload = resolve;
        xml.onerror = reject;
        xml.send(data);
      } );

     }
  }
/**
 * return promise 
 * getData: readFilePromise().then(data=>{});
 */
  readFilePromise():Promise<any>{
    return this.ajax("../../assets/hcp.json", "GET");
  }

  /**
   * in this case, we use this function to get json and deal with data.
   * @param callback :function, what we need to do if the data returned
   */
  readFile(callback){
     var req = new XMLHttpRequest();

    req.onreadystatechange=function()
    {
      if (req.readyState==4 && req.status==200)
      {
        if(req.responseText!=null && req.responseText!==''){
          let data = JSON.parse( req.responseText );
          const customers = data.value;
          const customerList = data.value.map(customer=>{
            let dept='';
            let hosp='';
            if(customer.hospital.includes(" > ")){
              hosp = customer.hospital.split(" > ")[0];
              dept = customer.hospital.split(" > ")[1];
            }else{
              hosp = customer.hospital;
            }
            return {id: customer.customer_id, name:customer.customer_name,  department:dept, hospital: hosp};
          });

          callback(customerList);
        }
      }
    }
    req.open("GET","../../assets/hcp.json",true);
    req.send(null);
    // var js = JSON.parse( req.responseText );
    //console.log(js.@odata.count);
    //$("#div").text(js.time)
    //return js;


  }
  
}
