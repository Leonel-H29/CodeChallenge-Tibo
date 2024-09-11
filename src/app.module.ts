import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { MysqlTypeORMModule } from '@src/clients/typeorm/mysql/mysql-typeorm.module';
import { CurrentAccountModule } from '@src/modules/checking-accounts/checking-account.module';
import { AppConfigService } from '@src/app.configService';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env',
      isGlobal: true,
    }),
    MysqlTypeORMModule,
    CurrentAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
