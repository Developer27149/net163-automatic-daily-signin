import process from "process";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { login_cellphone, daily_signin, yunbei } from "NeteaseCloudMusicApi";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// load env config
dotenv.config();

const {
  PHONE,
  PASSWORD,
  EMAIL,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  PRIVATE_KEY,
} = process.env;

const tryToSignin = async () => {
  const {
    body: { cookie },
  } = await login_cellphone({
    phone: PHONE!,
    password: PASSWORD!,
  });

  daily_signin({
    type: 0,
    cookie,
  });
  yunbei({ cookie });
};

const sendErrorMsg = async (text: string) => {
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  const accessToken = await oAuth2Client.getAccessToken();
  const options: SMTPTransport.Options = {
    from: EMAIL!,
    to: EMAIL!,
    subject: "网易云签到工具异常报告",
    text,
  };

  const auth = {
    type: "OAuth2",
    user: EMAIL,
    clientId: CLIENT_ID,
    serviceClient: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken.token,
    privateKey: PRIVATE_KEY!.replace(/\\n/g, "\n"),
  };

  const transporter = nodemailer.createTransport({
    // @ts-ignore
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 587, // TLS (google requires this port for TLS)
    secure: false, // Not SSL
    requireTLS: true, // Uses STARTTLS command (nodemailer-ism)
    auth,
  });

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success", info);
    }
  });
};

// login and signin
(async () => {
  try {
    await tryToSignin();
  } catch (error: any) {
    try {
      await sendErrorMsg(error);
    } catch (error) {
      console.log("error", error);
    }
  }
})();
