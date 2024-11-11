import { registerAs } from "@nestjs/config";

interface IBalanceConfig{
    host: string,
    port: number,
}

const { env } = process;

export const balanceConfig = registerAs<IBalanceConfig>('bal', () => ({
    host: env.BALANCE_HOST,
    port: +env.BALANCE_PORT,
}))