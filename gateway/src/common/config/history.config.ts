import { registerAs } from "@nestjs/config";

interface IHistoryConfig{
    host: string,
    port: number,
}

const { env } = process;

export const historyConfig = registerAs<IHistoryConfig>('his', () => ({
    host: env.HISTORY_HOST,
    port: +env.HISTORY_PORT,
}))