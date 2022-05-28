import { EstoqueEntity } from "src/app/estoque/entity/estoque.entity";
import { ProdutoEntity } from "src/app/produto/entity/produto.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'produtos_estoques'})
export class ProdutoEstoqueEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'estoque_quantidade', type:'integer'})
    quantidade: number;
    
    @ManyToOne(() => ProdutoEntity, produto => produto.estoqueProduto)
    produto: ProdutoEntity;
    
    @ManyToOne(() => EstoqueEntity, estoque => estoque.produtosEstoque)
    estoque: EstoqueEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAT: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}