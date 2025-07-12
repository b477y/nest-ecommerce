import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesKey } from 'src/common/decorators/roles.decorator';
import { RoleTypes, UserDocument } from 'src/db/models/User.model';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: UserDocument = context.switchToHttp().getRequest().user;

    const requiredRoles = this.reflector.getAllAndOverride<RoleTypes[]>(
      RolesKey,
      [context.getHandler()],
    );

    if (!requiredRoles.includes(user.role)) {
      throw new UnauthorizedException('Not authorized');
    }

    return true;
  }
}
