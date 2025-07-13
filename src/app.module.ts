import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './models/users/users.module';
import { UsersService } from './models/users/users.service';
import { PrismaModule } from './core/db/prisma.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        const code = error.extensions?.code || 'INTERNAL SERVER ERROR';
      
        return {
          message: error.message,
          extensions: {
            code,
            status: code === 'CONFLICT' ? 409 :
                    code === 'NOT_FOUND' ? 404 :
                    500,
            originalError: (error.extensions?.exception as any)?.stacktrace?.[0] || 'Serverda xatolik'
          },
        };
      }
    }), UsersModule, PrismaModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
