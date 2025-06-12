export const RESET_PASSWORD_TEMPLATE = (otp) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f0fdf4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 500px;
        margin: 40px auto;
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 128, 128, 0.1);
        border: 1px solid #d1fae5;
      }
      h1 {
        color: #047857;
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        color: #333;
      }
      .otp-code {
        display: inline-block;
        padding: 12px 24px;
        font-size: 20px;
        letter-spacing: 3px;
        background-color: #ecfdf5;
        color: #065f46;
        border-radius: 8px;
        font-weight: bold;
        margin: 20px 0;
        text-align: center;
      }
      .footer {
        font-size: 12px;
        color: #888;
        text-align: center;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>You requested to reset your password. Please use the following OTP code to proceed:</p>
      <div class="otp-code">${otp}</div>
      <p>This code will expire in 10 minutes. If you did not request a password reset, you can safely ignore this email.</p>
      <p>Thanks,<br/>Your App Team</p>
      <div class="footer">© ${new Date().getFullYear()} Your App. All rights reserved.</div>
    </div>
  </body>
</html>
`;
