import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstoqueEntity } from '../estoque/entity/estoque.entity';
import { ProdutoEntity } from '../produto/entity/produto.entity';
import { ProdutoEstoqueEntity } from './entity/produto_estoque.entity';

@Injectable()
export class ProdutoEstoqueService {
    constructor(
        @InjectRepository(ProdutoEstoqueEntity)
        private readonly produtoEstoqueRepository: Repository<ProdutoEstoqueEntity>,
    ) {}

        
        async findAll() {
            return await this.produtoEstoqueRepository.find();
        }

        async findOneOrFail(id: string) {
            try{
              return await this.produtoEstoqueRepository.findOneOrFail(id);
            } catch (error) {
              throw new NotFoundException(error.message);
            }
        }

        async create(data) {
            console.log('create recebeu ', data);

            let produtoEstoque = await this.produtoEstoqueRepository.findOne({
                where: {
                    produto: {
                        id: data.produto
                    },
                    estoque: {
                        id: data.estoque
                    }
                }
            });

            if (!produtoEstoque) {
                return await this.produtoEstoqueRepository.save(this.produtoEstoqueRepository.create(data));
            }
            else {
                produtoEstoque.quantidade = data.quantidade;
                return await this.produtoEstoqueRepository.save(produtoEstoque);
            }
        }
        async update(id:string, data) {
            const produtoEstoque = await this.findOneOrFail(id);

            this.produtoEstoqueRepository.merge(produtoEstoque, data);
            return await this.produtoEstoqueRepository.save(produtoEstoque)
        }

        async deleteById(id: string) {
            await this.findOneOrFail(id);
            await this.produtoEstoqueRepository.softDelete(id);
        }

        async findRemoved() {
            return await this.produtoEstoqueRepository.query('select * from produtos_estoques where deleted_at is not null');
        }
}
