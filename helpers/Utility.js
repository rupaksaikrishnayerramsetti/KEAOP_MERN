const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")

function generatePassword() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
  const passwordLength = 8;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

function hashPassword(password) {
  const sha1Hash = crypto.createHash("sha1");
  sha1Hash.update(password);
  return sha1Hash.digest("hex");
}

function sendEmail(mail, subject, template) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yrsaikrishna@gmail.com",
      pass: "ztdbrlhvuwxocjik",
    },
  });

  var mailOptions = {
    from: '"Keep Everything at One Place Admin" <yrsaikrishna@gmail.com>',
    to: mail,
    replyTo: '"Keep Everything at One Place Admin" <yrsaikrishna@gmail.com>',
    subject: subject,
    html: template,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      callback(false)
    } else {
      console.log("Email sent: " + info.response);
      callback(true)
    }
  });
}

function JWTTokenData(token){
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

function modifyDate(date) {
  const timestamp = Date.parse(date);
  if (isNaN(timestamp)) {
      return "Invalid Date";
  }
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return formattedDate;
}

function modifyTime(time) {
  const timestamp = Date.parse(`January 1, 1970 ${time}`);
  if (isNaN(timestamp)) {
      return "Invalid Time";
  }
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  return formattedTime;
}

function generateGoogleCalendarLink(title, date, time, description = '') {
  const [year, month, day] = date.split('-');
  const [hours, minutes, meridian] = time.match(/\d+|am|pm/gi); // Extract hours, minutes, and meridian

  // Convert hours to 24-hour format
  let adjustedHours = parseInt(hours, 10);
  if (meridian && meridian.toLowerCase() === 'pm') {
      adjustedHours += 12;
  }

  // Create a Date object in the local time zone
  let eventDate = new Date(year, month - 1, day, adjustedHours, minutes);

  if (isNaN(eventDate.getTime())) {
      throw new Error("Invalid Date or Time");
  }

  // Convert to UTC
  const utcOffset = eventDate.getTimezoneOffset();
  eventDate.setMinutes(eventDate.getMinutes() - utcOffset);

  // Set end time to 30 minutes after start time (UTC)
  const endDateTime = new Date(eventDate.getTime() + 30 * 60 * 1000);

  const startDateTimeStr = eventDate.toISOString().replace(/[-:\.]/g, '').slice(0, -1) + 'Z';
  const endDateTimeStr = endDateTime.toISOString().replace(/[-:\.]/g, '').slice(0, -1) + 'Z';

  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const eventLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startDateTimeStr}/${endDateTimeStr}&details=${encodedDescription}&sf=true&output=xml`;

  return eventLink;
}

const Users = require("../models/Users")
async function getSalary(userId) {
  const user = await Users.find({_id: userId})
  return user[0].salary
}

async function createJson(userId) {
  const currentMonthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const salary = await getSalary(userId);
  const data = {
      [currentMonthYear]: {
          "PG": 0,
          "Food": 0,
          "Bills": 0,
          "Traveling": 0,
          "Shopping": 0,
          "Other": 0,
          "Savings": parseInt(salary, 10),
      }
  };
  return data;
}

async function jsonForCurrentMonth(userId, data) {
  const currentMonthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const salary = await getSalary(userId);
  data[currentMonthYear] = {
      "PG": 0,
      "Food": 0,
      "Bills": 0,
      "Traveling": 0,
      "Shopping": 0,
      "Other": 0,
      "Savings": parseInt(salary, 10),
  };
  return data;
}

module.exports = {
  generatePassword,
  hashPassword,
  sendEmail,
  JWTTokenData,
  modifyDate,
  modifyTime,
  generateGoogleCalendarLink,
  getSalary,
  createJson,
  jsonForCurrentMonth,
};
