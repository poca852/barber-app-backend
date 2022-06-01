const {response, request}= require("express")
const {PagoModel}= require("../models")
// const axios = require('axios');
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

  const {id} = req.query;
  console.log(req.query)
  const baseUrl = `https://api.mercadolibre.com/merchant_orders/${id}?acces-token=APP_USR-4436905275905541-052102-a7820d5ba3ecf53131dc3c6b5f912b59-1127725912`

  
  try {
    const resp = await fetch(baseUrl)
    const data = await resp.json();
    console.log(data)
    res.status(200).json(req.body)
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
