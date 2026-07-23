import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async checkDatabaseConnection() {
    try {
      const result =
        await this.dataSource.query<Array<{ now: Date }>>('SELECT NOW()');
      return {
        status: true,
        message: 'Connected to Database',
        dbTime: result[0].now,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new InternalServerErrorException({
        status: false,
        message: 'Database connection failed',
        error: errorMessage,
      });
    }
  }
}
