const uuid = require("uuid");
const twillio = require("twilio");

const VERIFICATION_CODE_LENGTH = 5;
const TEST_NUMBERS = ["+79991231212"];

let twilioClient;

const reformatPhone = (phone) => {
  return "+" + phone.replace(/[^\d]/g, "");
};

const getSMSClient = () => {
  if (twilioClient) {
    return twilioClient;
  }

  twilioClient = twillio(
    process.env.TWILLIO_ACCOUNT_SID,
    process.env.TWILLIO_AUTH_TOKEN
  );
  return twilioClient;
};

const generateRandomCode = (phone) => {
  let code = "";
  for (let i = 0; i < VERIFICATION_CODE_LENGTH; i++) {
    if (TEST_NUMBERS.indexOf(phone) !== -1) {
      code += String(i + 1);
    } else {
      code += String(Math.floor(Math.random() * 10));
    }
  }
  return code;
};

const generateToken = () => {
  return uuid.v4();
};

const sendSMS = async (phone, code) => {
  console.log(phone, code);
  if (TEST_NUMBERS.indexOf(phone) !== -1) {
    return;
  }

  await getSMSClient().messages.create({
    body: `Ваш проверочный код для входа в SlapStep: ${code}`,
    from: process.env.TWILLIO_PHONE_NUMBER,
    to: phone,
  });
};

module.exports = {
  generateRandomCode,
  generateToken,
  sendSMS,
  reformatPhone,
};
