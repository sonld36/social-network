import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthenticateModule } from './auth/authenticate.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/social-network"),
            UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
