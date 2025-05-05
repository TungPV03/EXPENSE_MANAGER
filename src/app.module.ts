import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: configService.get('NODE_ENV') === 'development',
        namingStrategy: new SnakeNamingStrategy(),
        entities: ['src/**/*.entity.ts'],
        migrations:
          process.env.NODE_ENV === 'development'
            ? ['src/migrations/*.ts']
            : ['dist/migrations/*.js'],
        cli: {
          entitiesDir: 'src/entities',
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    UserModule,
    AuthModule,
    CategoriesModule,
    ExpensesModule,
    IncomeModule,
    BudgetModule,
  ],
})
export class AppModule {}
