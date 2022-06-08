const nodemailer = require("nodemailer")




const sendMail = async(name, email ,idPurchaseOrder, date_approved, transaction_amount, pruebaData)=>{

    const datesProducts = [];

        pruebaData.items.map((p)=>{
          datesProducts.push({
            name: p.title,
            quantity: p.quantity,
            price: p.unit_price
          })
        })

  const url = "https://barber-app-henry.herokuapp.com";

  const contentHTML =
  `
   <h1>Purchase Order</h1>
   <p>HOLA ${name}<p>
   <p style= "color: red"> Tu compra se ha realizado con exito!! Para mas información clickea aqui 👇: </p>
   <a href="${url}"> ${url}</a>
  `;
  

const transporter =  nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "barberapphenry@gmail.com", // generated ethereal user
              pass: "kxztvsoaqzezigsc", // generated ethereal password
            },
          });                                             


   // send mail with defined transport object
const info = await transporter.sendMail({
from: '"Compra realizada con exito 😎" <barberapphenry@gmail.com>', // sender address
  to: `${email}`,
  subject: "Pago realizado ✔", // Subject line
  
 //text: "HOLAAA", // plain text body
  html: contentHTML
   // html body
});
console.log ("Mensaje enviado", info);

}



module.exports= {sendMail};
