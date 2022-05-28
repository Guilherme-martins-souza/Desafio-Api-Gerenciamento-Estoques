import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { EstoqueService } from './estoque.service';

@Controller('api/v1/estoques')
@UseGuards(AuthGuard('jwt'))
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService){}

    @Get()
    async index(){
        return await this.estoqueService.findAll();
    }

    @Get('history')
    async getHistory() {
        return await this.estoqueService.findRemoved();
    }

    @Post()
    async create(@Body() body: CreateEstoqueDto){
        return await this.estoqueService.create(body);
    }

    @Get(':id')
    async show(@Param(('id'), new ParseUUIDPipe()) id: string){
        return await this.estoqueService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() body: UpdateEstoqueDto){
        return await this.estoqueService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string){
        await this.estoqueService.deleteById(id)
    }
}