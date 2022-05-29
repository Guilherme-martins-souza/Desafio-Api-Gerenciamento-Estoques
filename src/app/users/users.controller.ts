import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async index() {
        return await this.usersService.findAll();
    }

    @Post()
    async store(@Body() body: CreateUserDto) {
        return await this.usersService.store(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.findOneOrFail({ id });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateUserDto,
    ) {
        return await this.usersService.update(id, body);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(
        @Param('id', new ParseUUIDPipe()) id: string) {
        await this.usersService.destroy(id);
    }

}

