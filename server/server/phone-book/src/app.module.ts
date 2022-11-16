import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import entities from './typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactsModule } from './contact/contact.module';

@Module({
  imports: [ContactsModule, ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: 'postgres' || configService.get('DB_USERNAME'),
        password: 'Liat2001' || configService.get('DB_PASSWORD'),
        database: 'phonebook' || configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      } as TypeOrmModuleAsyncOptions)
      
    }),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({

      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schama.ts'),
      //   outputAs: 'class',

      // },
      driver: ApolloDriver,
      debug: false,
      playground: false,
      autoSchemaFile: true,
    }),
    ],
  

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

