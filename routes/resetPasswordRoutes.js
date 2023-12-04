const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserModel = require('../dao/models/user.model.js');
const {mail} = require ("../config/config.js")


function generarCodigo() {
  return Math.floor(1000 + Math.random() * 9000);
}

router.get('/form', (req, res) => {
  res.render('reset-password-form');
});

router.get('/success/:resetToken', (req, res) => {
  const { resetToken } = req.params;
  res.render('reset-password-success', { resetToken });
});



router.post('/submit', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Correo electrónico no registrado' });
    }

    const codigoAleatorio = generarCodigo();
    console.log(codigoAleatorio);
    user.codigoReset = codigoAleatorio;
    await user.save();

    const resetLink = `http://localhost:8080/reset-password/success/${codigoAleatorio}`;


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: mail.GMAIL_ADDRESS,
        pass: mail.GMAIL_PWD
     }
    });

    const mailOptions = {
      from: "no-reply@coder.com",
      subject:"Recuperación de Contraseña",
      to: mail.GMAIL_ADDRESS,
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetLink}">Restablecer Contraseña</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.render('reset-password-success', { resetToken: codigoAleatorio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

