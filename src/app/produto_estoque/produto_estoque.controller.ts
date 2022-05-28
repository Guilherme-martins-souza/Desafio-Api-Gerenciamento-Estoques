import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProdutoEstoqueDto } from './dto/create-produto_estoque.dto';
import { UpdateProdutoEstoqueDto } from './dto/update-protudo_estoque.dto';
import { ProdutoEstoqueService } from './produto_estoque.service';

@Controller('api/v1/produto-estoque')
@UseGuards(AuthGuard('jwt'))
export class ProdutoEstoqueController {
        constructor(private readonly produtoEstoqueService: ProdutoEstoqueService){}
    
        @Get()
        async index(){
            return await this.produtoEstoqueService.findAll();
        }
    
        @Get('history')
        async getHistory() {
            return await this.produtoEstoqueService.findRemoved();
        }
    
        @Post()
        async create(@Body() body: CreateProdutoEstoqueDto) {
            return await this.produtoEstoqueService.create(body);
        }
    
        @Get(':id')
        async show(@Param(('id'), new ParseUUIDPipe()) id: string) {
            return await this.produtoEstoqueService.findOneOrFail(id);
        }
    
        @Put(':id')
        async update(
            @Param('id', new ParseUUIDPipe()) id: string, 
            @Body() body: UpdateProdutoEstoqueDto){
            return await this.produtoEstoqueService.update(id, body);
        }
    
        @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async destroy(@Param('id', new ParseUUIDPipe()) id: string){
            await this.produtoEstoqueService.deleteById(id)
        }
}
