const cors = require("cors");
require("dotenv").config();

const allowedOrigins = process.env.CORS_ORIGINS;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);
