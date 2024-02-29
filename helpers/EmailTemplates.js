function userAlertMsgTemplate(Title, Date, Time, eventLink) {
    const subject = "EVENT REMAINDER";
    const title = Title;
    const date = Date;
    const time = Time;
    const link = eventLink;
    const message = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${subject}</title>
        </head>
        <body style='font-family: Arial, sans-serif;'>
            <table width='100%' cellpadding='10'>
                <tr style='background-color: #007bff; color: #fff;'>
                    <td colspan='2' align='center'>
                        <h1>${subject} FOR ${title}</h1>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <h3>Dear User,</h3>
                        <p>We hope this message finds you well.</p>
                        <p>Your event details are as follows:</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>Title:</strong></td>
                    <td><p>${title}</p></td>
                </tr>
                <tr>
                    <td><strong>Date:</strong></td>
                    <td><p>${date}</p></td>
                </tr>
                <tr>
                    <td><strong>Time:</strong></td>
                    <td><p>${time}</p></td>
                </tr>
                <tr>
                    <td colspan='2' style='background-color: #f2f2f2; padding: 5px;'><strong>Would you like to schedule this event in your calendar? </strong>
                        <a href='${link}'>Click here to add into your Calendar</a>
                    </td>
                </tr>
                <tr>
                    <td colspan='2' style='background-color: #f2f2f2; padding: 10px;'>
                        <p><strong>Alert:</strong> Don't forget about your upcoming event!</p>
                    </td>
                </tr>
                <tr>
                    <td colspan='2' align='center'>
                        <p>Thank you for using our service. If you have any questions or need further assistance, please don't hesitate to contact us.</p>
                        <p>Best regards,</p>
                        <p>Your Service Provider</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>`;
    return message;
}

function userCredentialsTemplate(email, pass) {
    const template = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007BFF;
                    color: #fff;
                    text-align: center;
                    padding: 10px;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Welcome to Keep Everything at One Place Website</h2>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Your account has been created successfully.</p>
                    <p>Here are your login credentials:</p>
                    <p>Email: <strong>${email}</strong></p>
                    <p>Password: <strong>${pass}</strong></p>
                    <p>You can now log in using your email and password.</p>
                </div>
            </div>
        </body>
        </html>`;
    return template;
}

function userCredentialsChangedTemplate(email, pass) {
    const template = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007BFF;
                    color: #fff;
                    text-align: center;
                    padding: 10px;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Welcome to Keep Everything at One Place Website</h2>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Your account login password was successfully Changed.</p>
                    <p>Here are your login credentials:</p>
                    <p>Email: <strong>${email}</strong></p>
                    <p>Password: <strong>${pass}</strong></p>
                    <p>You can now log in using your email and new password.</p>
                </div>
            </div>
        </body>
        </html>`;
    return template;
}

function userEditedAlertMsgTemplate(Title, Date, Time, eventLink) {
    const subject = "UPDATED EVENT REMAINDER";
    const title = Title;
    const date = Date;
    const time = Time;
    const link = eventLink;
    const message = `
        <!DOCTYPE html>
        <html>

        <head>
            <title>${subject}</title>
        </head>

        <body style='font-family: Arial, sans-serif;'>
            <table width='100%' cellpadding='10'>
                <tr style='background-color: #007bff; color: #fff;'>
                    <td colspan='2' align='center'>
                        <h1>${subject} FOR ${title}</h1>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <h3>Dear User,</h3>
                        <p>We hope this message finds you well.</p>
                        <p>Your event details are as follows:</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>Title:</strong></td>
                    <td>
                        <p>${title}</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>Updated Date:</strong></td>
                    <td>
                        <p>${date}</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>Updated Time:</strong></td>
                    <td>
                        <p>${time}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan='2' style='background-color: #f2f2f2; padding: 5px;'><strong>Would you like to schedule this event in your calendar? </strong>
                        <a href='${link}'>Click here to add into your Calendar</a>
                    </td>
                </tr>
                <tr>
                    <td colspan='2' style='background-color: #f2f2f2; padding: 10px;'>
                        <p><strong>Alert:</strong> Don't forget about your upcoming event!</p>
                    </td>
                </tr>
                <tr>
                    <td colspan='2' align='center'>
                        <p>Thank you for using our service. If you have any questions or need further assistance, please don't hesitate to contact us.</p>
                        <p>Best regards,</p>
                        <p>Your Service Provider</p>
                    </td>
                </tr>
            </table>
        </body>

        </html>`;
    return message;
}

module.exports = {
    userCredentialsTemplate,
    userCredentialsChangedTemplate,
    userAlertMsgTemplate,
    userEditedAlertMsgTemplate
}
