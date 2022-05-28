import { IsNotEmpty } from "class-validator";
import { CreateEstoqueDto } from "./create-estoque.dto";

export class UpdateEstoqueDto extends CreateEstoqueDto {

    @IsNotEmpty()
    id: string;
}