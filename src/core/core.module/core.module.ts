import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { PrismaModule } from '../db/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports:[
        GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        playground: true,
        graphiql: true,
        introspection: true,
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
      }),
          PassportModule,
          PrismaModule,
          JwtModule.register({
            secret: 'yandiev',
            signOptions: { expiresIn: '1h' },
          })
    ],
    exports:[PassportModule,PrismaModule,JwtModule]
})
export class CoreModule{}
