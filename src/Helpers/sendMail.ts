import nodemailer from "nodemailer";

export const sendEmail = async (email: any, otp: String, name: String) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
    requireTLS: true,
    logger: true,
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: `OTP  for  Registration`,
    html: `<h4>Dear ${name},</h4>
            <p>This is to acknowledge the details of your registration. Your profile has been processed successfully.</p>
            
            <ul>
              <li>OTP: ${otp}</li>
              
            </ul>
            <p>OTP will Expire in 5 minutes</p>
            <p>Thank you for your registration. If you have any queries, contact the technical department.</p>
            <p>Best regards,</p>
            <h4>team highway delite</h4>
            `,

    headers: { "x-myheader": "test header" },
  });

  if (info.accepted.includes(email)) return true;
  else return false;
};
