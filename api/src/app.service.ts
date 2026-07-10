import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async checkDatabaseConnection() {
    try {
      const result = await this.dataSource.query('SELECT NOW()');
      return {
        status: true,
        message: 'Connected to Database',
        dbTime: result[0].now,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Database connection failed',
        error: error.message,
      });
    }
  }
}
