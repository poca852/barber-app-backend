const {response, request}= require("express")
const {Mail} = require("../models")
const nodemailer = require("nodemailer")


//ESTO ES SI POR EL FRONT (PERFIL ADMIN NECESITA SABER INFO DEL PAGO, RELACIONADO CON LA ORDEN DE COMPRA)



//CADA VEZ QUE SE EFECTUA EL PAGO! ==> DEBERIAMOS VER COMO UNIR CON LA ORDEN DE COMPRA!!
//VERIFICAR COMO LLEGA ESTA INFO DE MERCADO PAGO
const addMail = async (req= request, res= response)=>{

    const {nombre, email, texto, idDate} = req.body

   
    try{   

        const newMail = await Mail.create({

            texto,
            idDate,
            nombre,
            email

        })

        contentHTML= 
        `<h1>User information</h1>
        <ul>
            <li>Nombre : ${nombre}</li>
            <li>Mail : ${email}</li>

        </ul>
        <p>${texto}</p>
        `

    let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 465,
                  secure: true, // true for 465, false for other ports
                  auth: {
                    user: "consudiazc@gmail.com", // generated ethereal user
                    pass: "gtfgvwttovflaqqb", // generated ethereal password
                  },
                });

         // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"Confirmación Cita 👻" <consudiazc@gmail.com>', // sender address
        to: "consudiazc@hotmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
       // text: "Hello world?", // plain text body
        html: contentHTML
        , // html body
      });
console.log ("Mensaje enviado", info.messageId)


return res.status(200).json({
            ok: true,
            newMail,
          });

} catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: "Hable con el administrador",
        });
      }
};



module.exports= {addMail}

