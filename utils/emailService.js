import emailApi from "sib-api-v3-sdk";
import config from "config";

const sendVericationEmail = async (email, verificationToken) => {
  const defaultClient = emailApi.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = config.get("api_key");
};
