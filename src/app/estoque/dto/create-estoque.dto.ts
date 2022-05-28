import { IsNotEmpty, Min } from "class-validator";

export class CreateEstoqueDto{

    @IsNotEmpty()
    nomeEstoque: string;
}

