import 'dotenv/config';

interface IAppConfig{
    port: number,
    atSecret: string,
    rtSecret: string,
}

const { env } = process;

export const appConfig: IAppConfig = {
  port: +env.PORT,
  atSecret: env.AT_SECRET_KEY,
  rtSecret: env.RT_SECRET_KEY,
};
