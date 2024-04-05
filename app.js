const express = require("express");
require("dotenv").config()
const nodemailer = require("nodejs-nodemailer-outlook");

const server = express();

server.use(express.json())

server.post("/enviar-email", (req, res) => {
    const id = Math.floor(Math.random() * 10000);
    nodemailer.sendEmail({
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
        },
        from: process.env.MAIL_ADDRESS,
        to: req.body.destination,
        subject: "ID especial",
        text: `O seu id é: ${id}`,
        onSucess: (i) => {console.log(i);}
    })
    return res.status(201).json({status: 201, message: "E-mail enviado com sucesso.", id: id});
});

server.listen(8080);