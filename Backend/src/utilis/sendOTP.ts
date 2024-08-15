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
      clientId: process.env.Client_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN
    }
  })

  const sendOTPEmail = async(email:string) => {
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