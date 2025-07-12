import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDTO, SigninDTO } from './dto/auth.dto';
import { UserRepositoryService } from 'src/db/repository/User.repository.service';
import { compareHash } from 'src/common/security/hash.security';
import { sendEmail } from 'src/common/email/send.email';
import { TokenService, TokenTypes } from 'src/common/service/token.service';
import { UserDocument } from 'src/db/models/User.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  async signup(body: SignupDTO): Promise<any> {
    const { firstName, lastName, email, password } = body;

    const isExist =
      await this.userRepositoryService.checkDuplicateAccounts(email);

    if (isExist) {
      throw new ConflictException('User is already exist');
    }

    const user = await this.userRepositoryService.create({
      firstName,
      lastName,
      email,
      password,
    });

    await sendEmail({
      to: email,
      subject: 'Welcome to our platform',
      text: `Welcome, ${firstName} ${lastName}`,
    });

    return { message: 'Signed up successfully', user };
  }

  async signin(body: SigninDTO): Promise<{
    message: string;
    data: { tokens: { access_token: string; refresh_token: string } };
  }> {
    const { email, password } = body;

    const existedUser =
      await this.userRepositoryService.checkDuplicateAccounts(email);

    if (!existedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!compareHash(password, existedUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = await this.tokenService.sign({
      userRole: existedUser.role,
      tokenType: TokenTypes.access,
      payload: { id: existedUser._id },
    });

    const refresh_token = await this.tokenService.sign({
      userRole: existedUser.role,
      tokenType: TokenTypes.refresh,
      payload: { id: existedUser._id },
    });

    return {
      message: 'Signed in successfully',
      data: { tokens: { access_token, refresh_token } },
    };
  }

  async getProfile(email: string) {
    const user = await this.userRepositoryService.findOne({
      filter: { email },
    });

    return { message: "User's profile retrieved successfully", user };
  }
}
