import { Component, OnInit } from '@angular/core';
import { DataService } from './../dataservices';
import {Orderservice} from './order-manage.service';
import { Router } from '@angular/router';
import {Order} from './order'
import { ConstantService } from './../constantservice';
@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css'],
  providers : [DataService,Orderservice,ConstantService]
})
export class OrderManageComponent implements OnInit {
  productLists :any = [];
  productNameIdMap :any =  {};
  isOrderTableActive : Boolean = false;
  orderAdd :Order = {
    orderName : "",
    orderQuantity :"",
    contactNo : "",
    billNo : "",
    productId :"",
    tenantId : "",
  };
  
  ordersList: Order[] = [];
  constructor(

    private dataService: DataService,
    private orderservice:Orderservice,
    private constantService: ConstantService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.populateProductsList();
  }



addOrderOnClick() :void{
  console.log(this.orderAdd);
    if(this.warningChecking()){
      this.ordersList.push(this.orderAdd);
      this.isOrderTableActive = true;
      this.clearAddOrder(); 
    }
    else{
      alert("Please Enter valid entry");
    }
}


resetForm(): void {
  this.clearAddOrder();
  this.ordersList = [];
  this.isOrderTableActive = false;
  //this.submitBtnActiveFlag = false;
  //this.selectedAssetType  = null;
  //this.setDefaultMsg();
}
clearAddOrder(): void {
  this.orderAdd = {
    orderName : "",
    orderQuantity :"",
    contactNo : "",
    billNo : "",
    productId :"",
    tenantId : "",
  };
}

placeOrderOnClick(){
  if(this.ordersList.length < 1){
    alert("Please enter into the input !!")
  }
  else{
    console.log(this.ordersList);
    let inserOrders = {
      "orderslist" : this.ordersList
    }
    this.orderservice.createOrders(inserOrders).then(
      data =>{
        console.log("Data---------",data)
        if(data[0].status === 200){
          alert("Order(s) Added Successfully !!")
        }
        else{
          console.log("Some error occured !!")
        }
      }
    )
  }
 
}

warningChecking(): boolean {
  let validFlag: boolean = true;
 // this.addPropertyBtnClass = 'btn-primary';
 let orderAdd = this.orderAdd;

      if(!this.constantService.validationRegexs.numberReg.test(orderAdd.orderQuantity)){
          alert('Please provide a valid Order Qunatity');
          validFlag =  false;
      }
        if( orderAdd.orderName.trim() == ''
          || orderAdd.orderQuantity == null
          || Number(orderAdd.orderQuantity) <=0
          || orderAdd.productId.trim() == ''
          || orderAdd.tenantId.trim() == ''
          || orderAdd.billNo.trim() == ''){
          validFlag = false;
        }
        return validFlag;
}

populateProductsList(): void {
  this.orderservice.getAllProducts().then(
    data => {
     // console.log(data);
      if(data[0].status === 200){
        this.productLists = data[0].json.data;
        console.log(this.productLists);
        this.productLists.forEach(element => {
            this.productNameIdMap[element.product_name] =element.product_id
        });
        console.log(this.productNameIdMap);
      
        }
    }
  )
}

}



