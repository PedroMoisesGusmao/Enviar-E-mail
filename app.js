const express = require("express");
require("dotenv").config()
const nodemailer = require("nodejs-nodemailer-outlook");

const server = express();

server.use(express.json())

function verificarBody(req, res, next) {
    if (!req.body.destination) {
        return res.status(400).json({error: "Ocorreu um erro, chave 'destination' não encontrada."});
    }
    return next();
}

server.post("/enviar-email", verificarBody, (req, res) => {
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
        onSucess: console.log(`E-mail enviado com sucesso para ${req.body.destination}`),
        onError: (e) => console.log(e)
    });
    return res.status(201).json({message: "E-mail enviado com sucesso.", id: id});
});

server.listen(8080);