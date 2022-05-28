
import { ProdutoEstoqueEntity } from 'src/app/produto_estoque/entity/produto_estoque.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'estoques'})
export class EstoqueEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => ProdutoEstoqueEntity, (produtoEstoque) => produtoEstoque.estoque)
    produtosEstoque: ProdutoEstoqueEntity[]
    
    @Column({ name: 'nomeEstoque'})
    nomeEstoque: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAT: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

}