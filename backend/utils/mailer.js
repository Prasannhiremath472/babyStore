const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from:    `"My Baby Store" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: 'Your OTP for My Baby Store',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
        <div style="text-align:center;margin-bottom:20px">
          <h2 style="color:#3D35A8;margin:0">My <span style="color:#FFD700">BABY</span></h2>
          <p style="color:#6b7280;font-size:13px">The New Born Baby Shop</p>
        </div>
        <h3 style="color:#1a1460">Your One-Time Password</h3>
        <p style="color:#4b5563">Use the OTP below to verify your account. It is valid for <strong>10 minutes</strong>.</p>
        <div style="background:#F8F7FF;border:2px solid #3D35A8;border-radius:10px;padding:20px;text-align:center;margin:20px 0">
          <span style="font-size:36px;font-weight:900;letter-spacing:12px;color:#3D35A8">${otp}</span>
        </div>
        <p style="color:#9ca3af;font-size:12px">If you did not request this OTP, please ignore this email.</p>
      </div>
    `,
  });
};

const sendOrderConfirmation = async (email, order) => {
  await transporter.sendMail({
    from:    `"My Baby Store" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: `Order Confirmed — #${order.orderNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px">
        <h2 style="color:#3D35A8">Order Confirmed! 🎉</h2>
        <p>Hi ${order.firstName}, your order <strong>#${order.orderNumber}</strong> has been placed successfully.</p>
        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
        <p><strong>Payment:</strong> ${order.paymentMethod}</p>
        <p>We'll notify you when your order is shipped.</p>
        <p style="color:#6b7280;font-size:12px">Thank you for shopping with My Baby Store!</p>
      </div>
    `,
  });
};

module.exports = { sendOTP, sendOrderConfirmation };
