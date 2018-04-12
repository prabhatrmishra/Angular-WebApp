export class UrlServices {

  multiTenantParam =
  {
    tenantId : 1
  }

  projectConfiguration = {
    admin : {
      username : 'admin',
      authorizedModule : [],
      apiKey : '########################### API KEY ##########################',
    }
   
  }

  urls = {
    //baseConfigUrl : 'http://localhost:5000',
    
    baseConfigUrl : 'https://fassosservice.herokuapp.com',

  product : {
    getAll : '/api/product/getAll',
    getByProductDisplay : '/api/product/getDisplayData',
    create : '/api/product/create',
    statsupdate :'/api/productStats/update'
  },

  order :{
    create : '/api/order/create',
    bulkcreate : '/api/order/bulkcreate',
    update : '/api/order/update',

  }
  };

}
