import nodemailer from 'nodemailer'
import {ObjectId}  from 'mongodb'
import Otp from '../Modules/OTP/otp.model'

// Transporter configuration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'systematicsquad69@gmail.com',
      pass: '#Kola9696',
      clientId: '638772769616-bf78l4n0m57lpar5tuhqlrkqb0cr89f3.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04RKSlvAdP_trCgYIARAAGAQSNwF-L9Irh_5G_X4rdnTT5aIJZVIK8H2x7k0kRghPb87YORf4GoILDkcd0a3xwdmGOtHnSYjY_yQ'
    }
  })

  const sendOTPEmail = async(email:string) => {
    console.log(email)
    const generateOTP = Math.floor(1000 + Math.random() * 9000)
    const mailOptions = {
        from:"simonrosedale059@gmail.com",
        to: email,
        subject: "Your OTP",
       html: `<p>Your OTP is <strong>${generateOTP}</strong>. Please use this code to verify your email address.</p>`

    }
    try {
        const result = await Otp.create({
            userEmail: email,
            otp:generateOTP
        })
        const info = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', info.messageId)
    } catch (error) {
        console.log('Error sending email: ', error)
    }
  }

export default sendOTPEmail