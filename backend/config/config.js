import dotenv from "dotenv";

global.NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === undefined) {
  dotenv.config({
    path: "../secrets.env",
  });
}
global.NODE_ENV = process.env.NODE_ENV;

console.log(NODE_ENV);

export const MYSQL_CONFIG = {
  host: process.env.MYSQL_SERVER,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  port: process.env.MYSQL_PORT,
  queueLimit: 0,
  namedPlaceholders: true,
};

export const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain: process.env.NODE_ENV === "prod" ? ".quackprep.com" : "",
    httpOnly: process.env.NODE_ENV === "prod" ? true : false,
    secure: process.env.NODE_ENV !== "local",
    sameSite: true,
  },
};

export const REDIS_URL = process.env.REDIS_URL;

export const GOOGLE_OAUTH_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`, // local or prod
};
