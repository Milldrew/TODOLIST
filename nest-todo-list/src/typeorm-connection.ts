import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class TypeormConnection {
  getConfig() {
    let ormConfig: TypeOrmModuleOptions;
    if (process.env.DEVELOPMENT) {
      console.log('development config');
      ormConfig = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'pass123',
        database: 'todo_list',
        autoLoadEntities: true,
        synchronize: true,
      };
    } else {
      console.log('production config');
      ormConfig = {
        type: 'postgres',
        host: '35.193.146.14',
        port: 5432,
        username: 'postgres',
        password: 'pass123',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      };
    }
    return ormConfig;
  }
}

export default new TypeormConnection().getConfig();
