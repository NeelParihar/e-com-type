module.exports = {
    database: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "myuser",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "ecom",
    },
    JWT_SECRET: process.env.JWT_SECRET||"ECOMMVERYSECRET",
};
