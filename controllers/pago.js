const {response, request}= require("express")
const {PagoModel, ProductsModel}= require("../models")
const fetch = require('node-fetch');
//ESTO ES SI POR EL FRONT (PERFIL ADMIN NECESITA SABER INFO DEL PAGO, RELACIONADO CON LA ORDEN DE COMPRA)

const getPago = async (req= request, res= response)=>{

    //const {id} = req.query
try{    
const pago = await PagoModel.findAll({
        where: {
              pagado
            },
            attributes: ["formaPago", "idPurchaseOrder","id", "pagado"]
          });
    
 res.status(200).json({
            ok: true, 
            pago
        })   
    } catch (error) {
            console.log(error);
            res.status(500).json({
              ok: false,
              msg: "Hable con el administrador",
            });
          }
};
    

//CADA VEZ QUE SE EFECTUA EL PAGO! ==> DEBERIAMOS VER COMO UNIR CON LA ORDEN DE COMPRA!!
//VERIFICAR COMO LLEGA ESTA INFO DE MERCADO PAGO
const addPago = async (req= request, res= response)=>{

    const{formaPago, idPurchaseOrder} = req.body
 
    try{   
    const newPago = await PagoModel.create({

        formaPago,
        idPurchaseOrder
    })

  
    res.status(200).json({
        ok: true, 
        id: newPago.id,
        formaPago: newPago.formaPago,
        idPurchaseOrder: newPago.idPurchaseOrder
       
    })

} catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: "Hable con el administrador",
        });
      }
};


const confirmarPago = async(req = request, res = response) => {

  /*let pruebaData = {
    "id": 4877016187,
    "status": "closed",
    "external_reference": "",
    "preference_id": "1127725912-de653ff7-7e5a-4628-b003-9cd2fb7fa390",
    "payments": [
        {
            "id": 22819489769,
            "transaction_amount": 1000,
            "total_paid_amount": 1000,
            "shipping_cost": 0,
            "currency_id": "MXN",
            "status": "approved",
            "status_detail": "accredited",
            "operation_type": "regular_payment",
            "date_approved": "2022-06-01T19:21:31.000-04:00",
            "date_created": "2022-06-01T19:21:30.000-04:00",
            "last_modified": "2022-06-01T19:21:31.000-04:00",
            "amount_refunded": 0
        }
    ],
    "shipments": [],
    "payouts": [],
    "collector": {
        "id": 1127725912,
        "email": "",
        "nickname": "TESTWKNQUAMG"
    },
    "marketplace": "NONE",
    "notification_url": "https://barber-app-henry.herokuapp.com/api/pago/confirmation",
    "date_created": "2022-06-01T19:21:29.864-04:00",
    "last_updated": "2022-06-01T19:21:31.565-04:00",
    "sponsor_id": null,
    "shipping_cost": 0,
    "total_amount": 1000,
    "site_id": "MLM",
    "paid_amount": 1000,
    "refunded_amount": 0,
    "payer": {
        "id": 1127730130,
        "email": ""
    },
    "items": [
        {
            "id": "334182a4-65ec-4856-b496-8224b60f0823",
            "category_id": "17ce48a7-ff80-4a0d-8e90-55e42abeb1b1",
            "idPurchaseOrder": "20ce48a7-ff80-4a0d-8e90-55e42abeb1f1",
            "currency_id": "MXN",
            "description": "pelo",
            "picture_url": null,
            "title": "crema bigote",
            "quantity": 5,
            "unit_price": 50
        },
        {
            "id": "8e8c44cb-aa01-4dc8-9ea6-7dae067911f5",
            "category_id": "17ce48a7-ff80-4a0d-8e90-55e42abeb1b1",
            "currency_id": "MXN",
            "description": "pelo",
            "picture_url": null,
            "title": "crema calva",
            "quantity": 15,
            "unit_price": 50
        }
    ],
    "cancelled": false,
    "additional_info": "",
    "application_id": null,
    "order_status": "paid"
}
*/

const {transaction_amount, shipping_cost, currency_id, status, date_approved, operation_type} = req.body.pruebaData.payments[0]
const {idPurchaseOrder} = req.body.pruebaData.items[0]

  try {
  /*if(req.query.topic === 'merchant_order'){
    const {id} = req.query;
    console.log(req.query)
    const baseUrl = `https://api.mercadolibre.com/merchant_orders/${id}?access_token=APP_USR-4436905275905541-052102-a7820d5ba3ecf53131dc3c6b5f912b59-1127725912`
  
    
      const resp = await fetch(baseUrl)
      const data = await resp.json();
*/
      //Crear pago

      if(!req.body.pruebaData.cancelled && status === 'approved'){
        const newPago = await PagoModel.create({
          transaction_amount,
           shipping_cost,
            currency_id,
             status,
              date_approved,
               operation_type,
               idPurchaseOrder
      })

      // Modificar Stock

      let foundProduct = []
      let actualizacion = [];
      
        for(let i = 0; i < req.body.pruebaData.items.length; i++){
          console.log(req.body.pruebaData.items[i].quantity);
          foundProduct = [...foundProduct, await ProductsModel.findOne({where:{id:req.body.pruebaData.items[i].id}})];
          actualizacion = [...actualizacion, await ProductsModel.update({stock:foundProduct[i].stock - req.body.pruebaData.items[i].quantity}, {
         where: {
           id: req.body.pruebaData.items[i].id
         }
       })];
     }
   console.log("UPDATE--->",actualizacion)
   console.log("PRODUCT--->",foundProduct)

     return res.json(newPago);

     //Email:
     
      
    }
  
     
      //return res.status(200).json(req.body)
  
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}


module.exports={
    getPago,
    addPago,
    confirmarPago
}
