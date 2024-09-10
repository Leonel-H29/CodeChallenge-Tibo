import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
//import { MysqlBaseClient } from '@src/clients/mysql/mysql-base-client';
import { MysqlModule } from '@src/clients/mysql/mysql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env',
      isGlobal: true,
    }),
    MysqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
