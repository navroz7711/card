import 'dotenv/config';

interface IAppConfig{
    port: number,
}

const { env } = process;

export const appConfig: IAppConfig = {
  port: +env.PORT,
};