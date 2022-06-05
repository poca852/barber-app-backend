const nodemailer = require("nodemailer")
const pdf = require("pdf-creator-node");
const fs = require("fs");


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
   <p>Te adjuntamos el detalle de la orden de compra<p>
  `;
  

  const options = {
    format: "A3",
    orientation: "portrait",
    color: "red",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">BARBER APP</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

//cambiar en deploy
const html = fs.readFileSync("/home/arch-warrior/SoyHenry/ProyectoGrupal/barber-app-backend/helpers/template.html", "utf8");

const document =  {
  html: html,
  data:{
    datesProducts: datesProducts,
    idPurchaseOrder: idPurchaseOrder,
    transaction_amount: transaction_amount,
    date_approved:date_approved
  } ,
  path: "/home/arch-warrior/Archivo.pdf", //<---- cambiar en deploy
  type: "",
};

pdf.create(document, options)
  .then((res) => {
    console.log("Respuesta de creacion--->",res);
  })
  .catch((error) => {
    console.error(error);
  });
  


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
  attachments: [{
    filename: 'Archivo.pdf',
    path: '/home/arch-warrior/Archivo.pdf', //<---- cambiar en deploy
    contentType: 'application/pdf'
  }],
  
 //text: "HOLAAA", // plain text body
  html: contentHTML
   // html body
});
console.log ("Mensaje enviado", info);

}



module.exports= {sendMail};