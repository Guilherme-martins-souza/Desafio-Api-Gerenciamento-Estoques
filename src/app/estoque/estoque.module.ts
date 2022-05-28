import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueEntity } from './entity/estoque.entity';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstoqueEntity])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
  exports: [EstoqueService]
})
export class EstoqueModule {}
