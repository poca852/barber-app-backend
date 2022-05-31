const fetch = require("node-fetch");

const url = "https://api.mercadopago.com/checkout/preferences";

     const createPayment = async(cart, res) =>{
        //console.log(cart)
        const body = {
            payer_email: "test_user_11278172@testuser.com", //comprador de Mercado Pago de prueba
            items:cart, //<-- carrito [{title,description,picture_url,category_id,quantity,unit_price}]
            back_urls:{
            succes:"https://barber-app-henry.herokuapp.com/api/pago/confirmation",
            failure: "/failure",
            pending: "/pending"
            },
            notification_url: ""
        };

        try {
            const payment = await fetch(url,{
                method: 'POST',
                body:JSON.stringify(body),
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer APP_USR-4436905275905541-052102-a7820d5ba3ecf53131dc3c6b5f912b59-1127725912` //vendedor de MercadoPAgo de prueba
                }
            });

            const jsonPayment = await payment.json();

            console.log("Respuesta MercadoPago",jsonPayment)
    
            return jsonPayment.init_point;
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: true, msg: "failed to create payment"});
        }
       
    }


module.exports = createPayment;