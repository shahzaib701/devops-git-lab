export const config = {
  port: Number(process.env.PORT) || 5000,
  corsOptions: {
    origin: true,
    credentials: true,
  },
};
