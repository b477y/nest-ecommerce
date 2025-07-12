import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { SigninDTO, SignupDTO } from './dto/auth.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: false,
  }),
)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signup(
    @Body()
    body: SignupDTO,
  ) {
    return this.authenticationService.signup(body);
  }

  @Get('profile')
  getProfile(@Body('email') email: string) {
    return this.authenticationService.getProfile(email);
  }

  @HttpCode(200)
  @Post('signin')
  signin(@Body() body: SigninDTO) {
    return this.authenticationService.signin(body);
  }
}
