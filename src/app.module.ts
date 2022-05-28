import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ProdutoModule } from './app/produto/produto.module';
import { EstoqueModule } from './app/estoque/estoque.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoEstoqueModule } from './app/produto_estoque/produto_estoque.module';
import { ProdutoEstoqueEntity } from './app/produto_estoque/entity/produto_estoque.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get( 'DB_HOST'),
        port: Number(ConfigService.get('DB_PORT')),
        username: ConfigService.get('DB_USERNAME'),
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
        }),
    }),
    ProdutoModule,
    EstoqueModule,
    ProdutoEstoqueEntity,
    UsersModule,
    AuthModule,
    ProdutoEstoqueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}