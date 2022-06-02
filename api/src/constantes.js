export const UrlValidator = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const { MONGO_HOST, MONGO_USER, MONGO_PASS, MONGO_DB, SESSION_COOKIE_NAME } = process.env;

export const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}`;

export const mongoUrl2 = 'mongodb://127.0.0.1/TheForaigner';  

export const mongoIdValidator = /^[a-f0-9]{24}$/

export const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const oneDayInSeconds = 60 * 60 * 24
export const oneDayInMilliseconds = oneDayInSeconds * 1000