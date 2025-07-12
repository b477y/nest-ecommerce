import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { RoleTypes, UserDocument } from 'src/db/models/User.model';
import { UserRepositoryService } from 'src/db/repository/User.repository.service';

export interface IToken {
  userRole?: RoleTypes;
  tokenType?: TokenTypes;
  payload: ITokenPayload;
  expiresIn?: string;
}

export interface ITokenPayload extends JwtPayload {
  id: Types.ObjectId;
}

export enum TokenTypes {
  access = 'access',
  refresh = 'refresh',
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  async sign({
    userRole = RoleTypes.user,
    tokenType = TokenTypes.access,
    payload,
  }: IToken): Promise<string> {
    try {
      const { accessTokenSk, refreshTokenSk } =
        this.getTokenSecretKeys(userRole);

      const token = await this.jwtService.signAsync(payload, {
        secret:
          tokenType === TokenTypes.access ? accessTokenSk : refreshTokenSk,
        expiresIn:
          tokenType === TokenTypes.access
            ? process.env.ACCESS_TOKEN_EXPIRATION_TIME!
            : process.env.REFRESH_TOKEN_EXPIRATION_TIME!,
      });
      return token;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verify({
    authorization,
  }: {
    authorization: string;
  }): Promise<UserDocument> {
    try {
      let userRole;
      const [Bearer, token] = authorization.split(' ');

      switch (Bearer) {
        case 'Bearer':
          userRole = RoleTypes.user;
          break;

        case 'System':
          userRole = RoleTypes.admin;
          break;

        default:
          throw new BadRequestException('Invalid role type');
      }

      const { accessTokenSk } = this.getTokenSecretKeys(userRole);

      const decoded: ITokenPayload = await this.jwtService.verifyAsync(token, {
        secret: accessTokenSk,
      });

      if (!decoded?.id) {
        throw new UnauthorizedException('In-valid token payload');
      }

      const user = await this.userRepositoryService.findOne({
        filter: { _id: decoded.id },
      });

      if (!user) {
        throw new NotFoundException('Not registered account');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private getTokenSecretKeys = (
    userRole: RoleTypes,
  ): { accessTokenSk: string; refreshTokenSk: string } => {
    try {
      let accessTokenSk, refreshTokenSk;

      switch (userRole) {
        case RoleTypes.admin:
          accessTokenSk = process.env.ADMIN_ACCESS_TOKEN_SECRET!;
          refreshTokenSk = process.env.ADMIN_REFRESH_TOKEN_SECRET!;
          break;

        case RoleTypes.user:
          accessTokenSk = process.env.USER_ACCESS_TOKEN_SECRET!;
          refreshTokenSk = process.env.USER_REFRESH_TOKEN_SECRET!;
          break;

        default:
          throw new BadRequestException('Invalid role type');
      }
      return { accessTokenSk, refreshTokenSk };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  };
}
