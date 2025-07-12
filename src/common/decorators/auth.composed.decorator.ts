import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleTypes } from 'src/db/models/User.model';
import { AuthenticationGuard } from '../guards/authentication/authentication.guard';
import { AuthorizationGuard } from '../guards/authorization/authorization.guard';
import { Roles } from './roles.decorator';

export function Auth(roles: RoleTypes[]) {
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthenticationGuard, AuthorizationGuard),
  );
}
