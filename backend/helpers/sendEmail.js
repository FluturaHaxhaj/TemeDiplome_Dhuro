const nodemailer = require("nodemailer");

const { URL } = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fluturadhuro@gmail.com",
    pass: "Dhuro1999#",
  },
});

const sendMail = (mailTo, token, name, surname) => {
  const mailOptions = {
    from: "fluturadhuro@gmail.com",
    to: `${mailTo}`,
    subject: "Welcome user",
    template: "email",
    context: { URL, token, name, surname },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error);
    }

    return { success: "true" };
  });
};

const forgotPasswordMail = (mailTo, name, password) => {
  const mailOptions = {
    from: "fluturadhuro@gmail.com",
    to: `${mailTo}`,
    subject: "Password for user",
    template: "password",
    context: { URL, name, password },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error);
    }

    return { success: "true" };
  });
};

module.exports = {
  transporter,
  sendMail,
  forgotPasswordMail,
};
