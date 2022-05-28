import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoEntity} from './entity/produto.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>,
        ) {}
    
    async findAll() {
        return await this.produtoRepository.find();
    }

    async findOneOrFail(id: string) {
        try{
          return await this.produtoRepository.findOneOrFail(id, { relations: ["estoqueProduto"] });
        } catch (error) {
          throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateProdutoDto) {
        return await this.produtoRepository.save(this.produtoRepository.create(data));
    }

    async update(id: string, data: UpdateProdutoDto) {
        const produto = await this.findOneOrFail(id);

        this.produtoRepository.merge(produto, data);
        return await this.produtoRepository.save(produto);
    }

    async deleteById(id: string) {
        await this.findOneOrFail(id);
        await this.produtoRepository.softDelete(id);
    }


    async findRemoved() {
        return await this.produtoRepository.query('select * from produtos where deleted_at is not null');
    }
   


}
