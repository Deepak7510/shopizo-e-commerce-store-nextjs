
export const mailOtpVerifyTemplate = (otp: string): string => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
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
        text-align: center;
        color: #333333;
      }
      .otp-box {
        font-size: 32px;
        font-weight: bold;
        background: #f0f0f0;
        display: inline-block;
        padding: 15px 30px;
        border-radius: 8px;
        margin: 20px 0;
        letter-spacing: 8px;
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
        <h2 style="margin: 0;">Your OTP Code</h2>
      </div>
      <div class="content">
        <p>Hi Dear,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <div class="otp-box">${otp}</div>
        <p>This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
        <p>Regards,<br />The Team</p>
      </div>
      <div class="footer">
        &copy; 2025 Shopizo. All rights reserved.
      </div>
    </div>
  </body>
</html>
`
}