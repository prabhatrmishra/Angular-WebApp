import { Component, OnInit } from '@angular/core';
import { DataService } from './../dataservices';
import {PredictionService} from './prediction-manage.service';
import { Router } from '@angular/router';
import {Prediction} from './prediction';
import { ConstantService } from './../constantservice';
@Component({
  selector: 'app-prediction-manage',
  templateUrl: './prediction-manage.component.html',
  styleUrls: ['./prediction-manage.component.css'],
  providers: [PredictionService,ConstantService]
})
export class PredictionManageComponent implements OnInit {
  productLists :any = [];
  predictionJson : Prediction = {
    productId : "",
    predictedNo : "",
    tenantId : ""
  }

  constructor(
    
        private predictionservice:PredictionService,
         private constantService: ConstantService,
        private router: Router,
      ) { }
    

  ngOnInit() {
    this.populateProductsList();
  }


  updatePredctionOnClick(){
 
    if(this.warningChecking()){
      this.predictionservice.updatePrediction(this.predictionJson).then(
        data => {
         // console.log(data);
          if(data[0].status === 200){
            alert("Prediction Number Successfully Updated")
          }
          else{
            alert("Some error occured while updating");
          }
        }
      )}  
    else{
      alert("Enter valid input .");
    }
  }


  warningChecking(): boolean {
    let validFlag: boolean = true;
    let predictionJson = this.predictionJson;
    var z1='^[0-9]*\d$';
       if(!this.constantService.validationRegexs.numberReg.test(predictionJson.predictedNo))
        {
            alert('Please provide a valid Prediction Number');
            validFlag =  false;
        }
    

    if( predictionJson.predictedNo.trim() == ''
       || predictionJson.productId.trim() == ''
       || predictionJson.tenantId.trim() == ''){
      validFlag = false;
    }
    return validFlag;
  }

  
  populateProductsList(): void {
    this.predictionservice.getAllProducts().then(
      data => {
       // console.log(data);
        if(data[0].status === 200){
          this.productLists = data[0].json.data;
          console.log(this.productLists);
      
        
          }
      }
    )
  }

}
