import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { CreatorsModule } from './creators/creators.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join('static'),
          serveRoot: '/static',
      }),
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(process.env.DATABASE_URL),
      UsersModule,
      AuthModule,
      PostsModule,
      BlogCategoryModule,
      CreatorsModule,
      FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
