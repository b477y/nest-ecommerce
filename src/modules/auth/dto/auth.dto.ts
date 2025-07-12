import {
  Allow,
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsPasswordMatched } from 'src/common/decorators/password.decorator';


export class SigninDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class SignupDTO extends SigninDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ValidateIf((o: SignupDTO) => {
    return o.password ? true : false;
  })
  @IsPasswordMatched('password', { message: 'passwords mismatch' })
  confirmPassword: string;
}
