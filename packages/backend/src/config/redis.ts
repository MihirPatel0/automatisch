import appConfig from './app';

type TRedisConfig = {
  host: string;
  port: number;
  username?: string;
  password?: string;
  tls?: Record<string, unknown>;
  enableReadyCheck?: boolean;
  enableOfflineQueue: boolean;
  connectTimeout?: number;
};

const redisConfig: TRedisConfig = {
  host: appConfig.redisHost,
  port: appConfig.redisPort,
  username: appConfig.redisUsername,
  password: appConfig.redisPassword,
  enableOfflineQueue: false,
  enableReadyCheck: true,
  connectTimeout: 10000,
};

if (appConfig.redisTls) {
  redisConfig.tls = {};
}

delete redisConfig.username;
delete redisConfig.password;
delete redisConfig.enableOfflineQueue;
delete redisConfig.enableReadyCheck;
delete redisConfig.tls;

export default redisConfig;
