/* eslint-disable @typescript-eslint/no-explicit-any */
import { transporter } from "@/lib/email";

interface SendMailProps {
  identifier: string;
  url: string;
}

async function sendVerificationRequest(params: SendMailProps) {
  const { identifier, url } = params;

  await transporter.sendMail({
    to: identifier,
    from: `摸鱼记 <${process.env.EMAIL_FROM}>`,
    subject: "登录到「摸鱼记」www.moyu-web.cn",
    html: `
   <div
      style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      "
    >
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td
            style="background-color: #f4f4f4; padding: 20px; text-align: center"
          >
            <h1 style="color: #444; margin-bottom: 20px">摸鱼记</h1>
            <p style="font-size: 16px; margin-bottom: 30px">
                单击下面的按钮登录您的帐户。
            </p>
            <a
              href=${url}
              style="
                background-color: #007bff;
                color: #ffffff;
                padding: 12px 24px;
                text-decoration: none;
                font-weight: bold;
                border-radius: 5px;
                display: inline-block;
              "
              >登录「摸鱼记」</a
            >
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #666;
            "
          >
            <p>
              如果您没有请求这封电子邮件，请忽略它或联系我们的支持团队。
            </p>
            <p>&copy; 2025 摸鱼记 保留所有权利</p>
          </td>
        </tr>
      </table>
    </div>
    `,
  });
}

export default function Email() {
  return {
    id: "email",
    type: "email",
    server: {},
    from: "Auth.js <no-reply@authjs.dev>",
    maxAge: 24 * 60 * 60,
    options: {},
    sendVerificationRequest,
  };
}
