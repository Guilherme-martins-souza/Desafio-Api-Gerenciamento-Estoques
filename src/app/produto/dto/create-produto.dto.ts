import { IsNotEmpty, Min } from "class-validator";

export class CreateProdutoDto{
    @IsNotEmpty()
    produto: string;
}

