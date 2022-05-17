import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const OAuth2 = google.auth.OAuth2;

// infos à obtenir sur le "https://developers.google.com/oauthplayground" et le console cloud plateform
const clientId = '';
const clientSecret = '';
const refreshToken = '';
const accessToken = '';

export default (mailTo, subject, title, text) => {

    const oauth2Client = new OAuth2(
        clientId, clientSecret, "https://developers.google.com/oauthplayground"
    )
    
    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

   console.log(mailTo, subject, title, text);           
        
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "john@doe@gmail.com", // le mail de l'user autorisé sur la plateforme google cloud 
            clientId: clientId, // client Id
            clientSecret: clientSecret, // client secret
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
    })

    const mailOptions = { 
        from: '"Commersaas" <commersaas@gmail.com>', // sender address
        to: mailTo, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: "<b>" + title + "</b><p>" + text + "<p>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ça rate");
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        });
}