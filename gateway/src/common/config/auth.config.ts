import { registerAs } from "@nestjs/config";

interface IAuthConfig{
    host: string,
    port: number,
}

const { env } = process;

export const authConfig = registerAs<IAuthConfig>('auth', () => ({
    host: env.AUTH_HOST,
    port: +env.AUTH_PORT
}))