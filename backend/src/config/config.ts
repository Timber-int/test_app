import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'SECRET_ACCESS_KEY',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'SECRET_REFRESH_KEY',
    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS || '30m',
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH || '30d',
    SECRET_ADMIN_EMAIL: process.env.SECRET_ADMIN_EMAIL,
    SECRET_ADMIN_PASSWORD: process.env.SECRET_ADMIN_PASSWORD,
};
