import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  BACKEND_API: 'https://battle.horse/oblong',
  VIS_HOME_API: 'https://oblong-relentless.herokuapp.com',
  VIS_SEARCH_API: 'https://oblong-kittens.herokuapp.com',
  VIS_PROFILE_API: 'https://oblong-onslaught.herokuapp.com',
};

export = ProdConfig;
