import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from 'src/common/service/token.service';
import { RoleTypes, UserDocument } from 'src/db/models/User.model';

export interface IAuthReq extends Request {
  user: UserDocument;
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;

    context.switchToHttp().getRequest().user = await this.tokenService.verify({
      authorization,
    });

    return true;
  }
}
