import { Component, OnInit } from '@angular/core';
import {Product} from './product'
import { DataService } from './../dataservices';
import {ProductService} from './product-component.service';
import { Router } from '@angular/router';
import { ConstantService } from './../constantservice';
@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css'],
  providers : [DataService,ProductService,ConstantService]
})
export class ProductComponentComponent implements OnInit {
  product: Product = {
    productName :"",
    productCategory:"",
    productType : "",
    predictedNo :"",
    tenantId:"",

     };
  constructor(
    private router: Router,
    private constantService: ConstantService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    console.log("in init ProductComponentComponent ......")
  }

createProductOnClick(){
  console.log(this.product);
    if(this.warningChecking()){
      this.productService.createProduct(this.product).then(
        data =>{
         console.log(data);
         if(data[0].status === 200){
   
           alert("Successfully Created !!")
        }
        else{
          alert("Some error occured !!")
        }
       })
    }
    else{
    alert("Please Enter valid inputs.")
    }
  
}

warningChecking(): boolean {
  let validFlag: boolean = true;
   // this.addPropertyBtnClass = 'btn-primary';
  let product = this.product;
  if(!this.constantService.validationRegexs.numberReg.test(product.predictedNo))
  {
      alert('Please provide a valid Prediction Number');
      validFlag =  false;
  }

  if( product.productCategory.trim() == ''
     || product.productType.trim() == ''
     || product.productName.trim() == ''){
    validFlag = false;
  }
  return validFlag;
}

}
