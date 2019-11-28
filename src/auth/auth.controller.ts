import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  LoginResponse,
  LoginRequest,
  RegistrationRequest,
  ResponseData,
} from './interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async authentication(@Request() req) {
    return req.user;
  }

  @Post('registration')
  async getProfile(
    @Body() payload: RegistrationRequest
  ): Promise<ResponseData> {
    return this.authService.registration(payload);
  }
}
