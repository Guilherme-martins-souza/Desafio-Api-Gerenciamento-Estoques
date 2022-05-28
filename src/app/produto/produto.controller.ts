import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('api/v1/produtos')
@UseGuards(AuthGuard('jwt'))
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    async index(){
        return await this.produtoService.findAll();
    }

    @Get('history')
    async getHistory() {
        return await this.produtoService.findRemoved();
    }

    @Post()
    async create(@Body() body: CreateProdutoDto){
        return await this.produtoService.create(body);
    }

    @Get(':id')
    async show(@Param(('id'), new ParseUUIDPipe()) id: string){
        return await this.produtoService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() body: UpdateProdutoDto){
        return await this.produtoService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string){
        await this.produtoService.deleteById(id)
    }
}
