import { registerAs } from "@nestjs/config";

interface IUserConfig{
    host: string,
    port: number,
}

const { env } = process;

export const userConfig = registerAs<IUserConfig>('user', () => ({
    host: env.USER_HOST,
    port: +env.USER_PORT
}))