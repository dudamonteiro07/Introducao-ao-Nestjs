import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { ApiTags, ApiBody, ApiCreatedResponse, ApiConflictResponse, ApiParam } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register.dto';
import { GoogleService } from './google-auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private googleService: GoogleService
    ){}

    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(dto);
    }

    @Post('register')
    @ApiBody({ type: RegisterUserDto })
    @ApiCreatedResponse({ description: 'Usuário registrado com sucesso' })
    @ApiConflictResponse({ description: 'Email já em uso' })
    async register(@Body() dto: RegisterUserDto) {
        return this.authService.registerUser(dto);
    }
    @Post('google')
    async loginWithGoogle(@Body() body: { idToken: string }) {
        const access_token = await this.googleService.veryfy(body.idToken)
        
        return { access_token } }

}