import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class TypeormConnection {
  getConfig() {
    let ormConfig: TypeOrmModuleOptions;
    if (process.env.DEVELOPMENT) {
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
      ormConfig = {
        type: 'postgres',
        host: '34.132.66.79',
        port: 5432,
        username: 'pass123',
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
