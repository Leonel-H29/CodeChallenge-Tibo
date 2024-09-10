import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from '@src/app.configService';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const appConfigService = new AppConfigService(configService);
        return {
          type: 'mysql',
          host: appConfigService.databaseHost,
          port: appConfigService.databasePort,
          username: appConfigService.databaseUser,
          password: appConfigService.databasePassword,
          database: appConfigService.databaseName,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppConfigService],
  exports: [],
})
export class MysqlModule {}
