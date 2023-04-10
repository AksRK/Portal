import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(process.env.DATABASE_URL),
      UsersModule,
      AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
