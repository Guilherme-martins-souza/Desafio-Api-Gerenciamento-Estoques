import { IsNotEmpty } from "class-validator";

export class CreateProdutoEstoqueDto {
    @IsNotEmpty()
    produto: string;
    
    @IsNotEmpty()
    estoque: string;

    @IsNotEmpty()
    quantidade: number;
}