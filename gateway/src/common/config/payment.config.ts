import { registerAs } from "@nestjs/config";

interface IPaymentConfig{
    host: string,
    port: number,
}

const { env } = process;

export const paymentConfig = registerAs<IPaymentConfig>('payment', () => ({
    host: env.PAYMENT_HOST,
    port: +env.PAYMENT_PORT,
}))