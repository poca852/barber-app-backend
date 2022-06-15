const nodemailer = require("nodemailer");

const sendEmailresetPass = async (email, subject, text) => {
    console.log("SendMail",email, subject, text)
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "hbarberapp@gmail.com", // generated ethereal user
              pass: "kgndpwcodkeytdiv", // generated ethereal password
            },
          });  

       const isSend = await transporter.sendMail({
            from: "hbarberapp@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log(isSend);
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmailresetPass;
