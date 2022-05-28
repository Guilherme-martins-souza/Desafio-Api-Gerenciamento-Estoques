import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueService } from '../estoque/estoque.service';
import { ProdutoEntity } from '../produto/entity/produto.entity';
import { ProdutoService } from '../produto/produto.service';
import { ProdutoEstoqueEntity } from './entity/produto_estoque.entity';
import { ProdutoEstoqueController } from './produto_estoque.controller';
import { ProdutoEstoqueService } from './produto_estoque.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEstoqueEntity])],
  controllers: [ProdutoEstoqueController],
  providers: [ProdutoEstoqueService],
  exports: [ProdutoEstoqueService]
})
export class ProdutoEstoqueModule {}
