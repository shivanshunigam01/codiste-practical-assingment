import { Controller, Post, Body, Get, Query, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() body: { name: string; email: string; password: string }) {
        return this.userService.registerUser(body.name, body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.userService.loginUser(body.email, body.password);
    }

    @Get('profile')
    async getProfile(@Query('userId') userId: number) {
        return this.userService.getUserProfile(userId);
    }

    @Post('edit-name')
    async editUserName(@Body() body: { userId: number; name: string }) {
        return this.userService.editUserName(body.userId, body.name);
    }
}
