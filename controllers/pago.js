const {response, request}= require("express")
const {PagoModel, PurchaseOrder}= require("../models")
const nodemailer = require('nodemailer');

//ESTO ES SI POR EL FRONT (PERFIL ADMIN NECESITA SABER INFO DEL PAGO, RELACIONADO CON LA ORDEN DE COMPRA)

const getPago = async (req= request, res= response)=>{


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
const addPago = async (req= require, res= response)=>{

    const{formaPago, idPurchaseOrder} = req.body
 
    try{   
    const newPago = await PagoModel.create({

        formaPago,
        idPurchaseOrder
    })

    //Actualizar estado de la orden

    const newOrder = await PurchaseOrder.update({status:true}, {
      where: {
        id: idPurchaseOrder
      }
    });

    //cambiar stock 

    if(newOrder.status){//verifica si el proceso de pago se completo satisfactoriamente

      for(let i = 0; i < foundProduct.length; i++){
      await ProductsModel.update({stock:foundProduct[i].stock - req.body[i].quantity}, {
       where: {
         id: req.body[i].idProduct
       }
     });
   }
   }
    
   //mail

   contentHTML= 
        `<h1>Orden de Compra</h1>
        <ul>
            <li>Numero de Orden : ${nombre}</li>
            <li>Productos : ${email}</li>
            <li>Cantidad de articulos : ${email}</li>
            <li>Precio Total : ${email}</li>
        </ul>
        
        `

    let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 465,
                  secure: true, // true for 465, false for other ports
                  auth: {
                    user: "barberapphenry@gmail.com", // generated ethereal user
                    pass: "kxztvsoaqzezigsc", // generated ethereal password
                  },
                });

         // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"Compra realizada con exito 👻" <barberapphenry@gmail.com>', // sender address
        to: "consudiazc@gmail.com", // list of receivers
        subject: "Pago realizado ✔", // Subject line
       // text: "Hello world?", // plain text body
        html: contentHTML
        , // html body
      });
console.log ("Mensaje enviado", info.messageId)


  
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




module.exports={
    getPago,
    addPago
}
