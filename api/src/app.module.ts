import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'swiftship_db',
      autoLoadEntities: true,
      synchronize: true, // Only for development/testing
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
