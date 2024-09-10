import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseURL(): string {
    return this.configService.get<string>('MYSQL_URL') || '';
  }

  get databaseHost(): string {
    return this.configService.get<string>('MYSQL_HOST') || '';
  }

  get databaseName(): string {
    return this.configService.get<string>('MYSQL_DATABASE') || '';
  }

  get databasePassword(): string {
    return this.configService.get<string>('MYSQL_PASSWORD') || '';
  }

  get databasePort(): number {
    return this.configService.get<number>('MYSQL_PORT') || 3306;
  }

  get databaseRootPassword(): string {
    return this.configService.get<string>('MYSQL_ROOT_PASSWORD') || '';
  }

  get databaseUser(): string {
    return this.configService.get<string>('MYSQL_USER') || '';
  }
}
