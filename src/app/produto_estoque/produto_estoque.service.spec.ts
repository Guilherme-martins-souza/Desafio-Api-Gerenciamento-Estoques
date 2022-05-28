import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoEstoqueService } from './produto_estoque.service';

describe('ProdutoEstoqueService', () => {
  let service: ProdutoEstoqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoEstoqueService],
    }).compile();

    service = module.get<ProdutoEstoqueService>(ProdutoEstoqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
