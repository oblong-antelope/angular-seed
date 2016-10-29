import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: 'https://oblong-adventures.herokuapp.com'
};

export = ProdConfig;
