import { Component, OnInit } from '@angular/core';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { DataService } from './../dataservices';
import {KitchenDisplayService} from './kitchen-display.service';
import { Router } from '@angular/router';
//import { ConstantService } from './../constantservice';
@Component({
  selector: 'app-kitchen-display',
  templateUrl: './kitchen-display.component.html',
  styleUrls: ['./kitchen-display.component.css'],
  providers : [DataService,KitchenDisplayService,]
})
export class KitchenDisplayComponent implements OnInit {
  statusBtnClass = [];
  title = "Data" ;
  productList = [];


  constructor(
    private dataService: DataService,
    private kitchenService:KitchenDisplayService,
    private router: Router,
   // private constantService: ConstantService,
 ) {};


  ngOnInit() {
    this.loadProductsData()
  }
  
  loadProductsData(){
    this.kitchenService.getAllProductStatData().then(
    data => {
    console.log(data);
    if(data[0].status === 200){
    this.dataService.productList = data[0].json;
    this.setProductStatData();
    }
   else{
     alert("Some Error Occured while fetching the data !!")
   }
 })
}

  clickChangeStatus(product): void {
    let updateJson = {}
    console.log("My Status has been changed ")
    updateJson = {
      "orderId" : product.orderId,
      "productId" : product.productId,
      "quantity" :  product.orderQuantity
    };

    this.kitchenService.updateProductOrder(updateJson).then(
      data =>{
        console.log(data);
        if(data[0].status === 202){
          alert("Updated Successfully")
          this.resetStatusButton(product)
          this.loadProductsData();
        }
        else{
          alert("Some Error Occured while updating!!")
          
        }
      }
    )
  }
  setProductStatData() {
  
    this.productList = this.dataService.productList;    
    this.dataService.productList.forEach(element =>{
      if( Number(element.orderQuantity) > 0){
 

  this.setStatusButton(element);
      }
      else{
        this.resetStatusButton(element);  
       }
     })
  }
  
  exportToExcel() {
    console.log("Excel is exported !!");
    const wsName = "My_data";
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const dataJson = this.prepareExcelData();
    console.log(dataJson);
    const ws: any = utils.json_to_sheet(dataJson);
    wb.SheetNames.push(wsName);
    wb.Sheets[wsName] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    const fileName: String = this.title.concat(' Report.xlsx');
    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), fileName);
  } 
  
  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  prepareExcelData(): any[] {
    const selectedData = [];
    const paramMap =    {
      "createdTillNowNo" : "createdTillNowNo",
      "predictedNo" : "predictedNo"
    };
    const dataJson = this.productList;
    dataJson.forEach(element => {
      
      console.log(element);
      const item = {};
      const keys = Object.keys(element);
      console.log(keys);
      keys.forEach(key => {
        if (paramMap[key] !== undefined && paramMap[key] !== undefined) {
          item [paramMap[key]] = element[key];
        }
      });
      selectedData.push(item);
    });
    console.log(selectedData)
    return selectedData;
  }


  setStatusButton(element){
    this.dataService.productOrderActivity[element.orderId] = true;
    this.statusBtnClass[element.orderId] = 'btn-default' ;
  }
  resetStatusButton(element){
    this.dataService.productOrderActivity[element.orderId] = false;
    this.statusBtnClass[element.orderId] = 'btn-danger' ;
  }


  routeToProductsOnClick():void {
    
      this.router.navigate(['product']);
  }

  routeToOrdersOnClick():void{

    this.router.navigate(['order']);
  }

  routeToPredictionsOnClick():void{
    this.router.navigate(['managePrediction']);
  }

}
