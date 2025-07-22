
export const mailEmailVerifylinkTamplate = (link: string): string => {
  return `
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: rgb(210, 201, 201);
        color: #6D28D9;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
        text-align: left;
        color: #333333;
      }
      .btn {
        display: inline-block;
        padding: 8px 64px;
        margin: 20px 0;
        background-color: #6D28D9;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        background-color: #f0f0f0;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2 style="margin: 0;">Shopizo</h2>
        <h2 style="margin: 0;">Verify Your Account</h2>
      </div>
      <div class="content">
        <p>Hi Dear,</p>
        <p>Thank you for registering with us. Please click the button below to verify your email address and complete your registration.</p>
        <p style="text-align: center;">
          <a href=${link} class="btn">Verify Email</a>
        </p>
        <p>If the button doesn't work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;"><a href=${link}>${link}</a></p>
        <p>If you did not create an account, you can safely ignore this email.</p>
        <p>Regards,<br />The Team</p>
      </div>
      <div class="footer">
        &copy; 2025 Shopizo. All rights reserved.
      </div>
    </div>
  </body>
</html>`
}