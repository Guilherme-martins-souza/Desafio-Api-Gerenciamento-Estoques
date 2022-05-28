import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { EstoqueEntity } from './entity/estoque.entity';

@Injectable()
export class EstoqueService {
   constructor(
       @InjectRepository(EstoqueEntity)
       private readonly estoqueRepository: Repository<EstoqueEntity>
       ) {}

       async findAll() {
        return await this.estoqueRepository.find();
    }

    async findOneOrFail(id: string) {
        try{
          return await this.estoqueRepository.findOneOrFail(id);
        } catch (error) {
          throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateEstoqueDto) {
        return await this.estoqueRepository.save(this.estoqueRepository.create(data));
    }

    async update(id: string, data: UpdateEstoqueDto) {
        const estoque = await this.findOneOrFail(id);

        this.estoqueRepository.merge(estoque, data);
        return await this.estoqueRepository.save(estoque);
    }

    async deleteById(id: string) {
        await this.findOneOrFail(id);
        await this.estoqueRepository.softDelete(id);
    }

    async findRemoved() {
        return await this.estoqueRepository.query('select * from estoques where deleted_at is not null');
    }
}
