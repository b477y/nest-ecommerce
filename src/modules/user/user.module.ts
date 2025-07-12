import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenService } from 'src/common/service/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from 'src/db/repository/User.repository.service';
import { UserModel } from 'src/db/models/User.model';
import { HeaderValidationMiddleware } from 'src/common/middlewares/service/header.validation.service.middleware';

@Module({
  imports: [UserModel],
  controllers: [UserController],
  providers: [UserService, JwtService, TokenService, UserRepositoryService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderValidationMiddleware).forRoutes(UserController);
  }
}
