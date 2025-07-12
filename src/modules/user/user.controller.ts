import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  AuthenticationGuard,
  IAuthReq,
} from '../../common/guards/authentication/authentication.guard';
import { User } from 'src/common/decorators/user.decorator';
import { RoleTypes, UserDocument } from 'src/db/models/User.model';
import { AuthorizationGuard } from 'src/common/guards/authorization/authorization.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Auth } from 'src/common/decorators/auth.composed.decorator';
import { WatchRequestInterceptor } from 'src/common/interceptors/watchRequest.interceptor';

@UseInterceptors(WatchRequestInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Auth([RoleTypes.user, RoleTypes.admin])
  @Get('profile')
  getProfile(@User() user: UserDocument) {
    return this.userService.getProfile(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
