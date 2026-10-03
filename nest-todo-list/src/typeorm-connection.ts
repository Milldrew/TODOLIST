// portfolio override: the committed config pointed at a retired Cloud SQL IP
// with a hard-coded password. Everything now comes from the environment.
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const connection: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};

export default connection;
