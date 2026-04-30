// lib/templates.ts
export const otpTemplate = (otp: string) => `
  <div style="font-family: Inter, Arial; padding: 24px; color: #111;">
    <h2>Your verification code</h2>

    <p style="font-size: 14px; color: #555;">
      Use the code below. It expires in 10 minutes.
    </p>

    <div style="
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 6px;
      margin: 20px 0;
      background: #f5f5f5;
      padding: 12px 18px;
      border-radius: 8px;
      display: inline-block;
    ">
      ${otp}
    </div>

    <p style="font-size: 12px; color: #888;">
      If you didn’t request this, ignore it.
    </p>
  </div>
`;