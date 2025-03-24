const mailer = require('nodemailer');

const sendingMail = async(to,subject,text) =>{
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"surveysnapofficial@gmail.com",
            pass:"fugi zqlb omkx nnnf"
        }
    })
    const mailOptions = {
        from:"surveysnapofficial@gmail.com",
        to: to,
        subject: subject,
        // text: text
        html:text
    }
    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
}

module.exports={
    sendingMail
}


