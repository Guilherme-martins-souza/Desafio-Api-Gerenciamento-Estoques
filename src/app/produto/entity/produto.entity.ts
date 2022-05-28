import { ProdutoEstoqueEntity } from "src/app/produto_estoque/entity/produto_estoque.entity";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";


@Entity({ name: 'produtos' })
export class ProdutoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    produto: string;

    @OneToMany(() => ProdutoEstoqueEntity, (produtoEstoque) => produtoEstoque.produto)
    estoqueProduto: ProdutoEstoqueEntity[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAT: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
