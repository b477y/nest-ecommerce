import { Module } from '@nestjs/common';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { UserRepositoryService } from 'src/db/repository/User.repository.service';
import { UserModel } from 'src/db/models/User.model';
import { TokenService } from 'src/common/service/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModel],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserRepositoryService,
    TokenService,
    JwtService,
  ],
})
export class AuthenticationModule {}
