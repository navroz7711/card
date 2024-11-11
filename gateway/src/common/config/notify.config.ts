import { registerAs } from "@nestjs/config";

interface INotifyConfig{
    host: string,
    port: number,
}

const { env } = process;

export const notifyConfig = registerAs<INotifyConfig>('notify', () => ({
    host: env.NOTIFY_HOST,
    port: +env.NOTIFY_PORT,
}))