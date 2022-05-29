import { IsNotEmpty } from "class-validator";

export class UpdateProdutoEstoqueDto{

    @IsNotEmpty()
    quantidade: number;
}