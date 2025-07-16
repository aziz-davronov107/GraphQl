import { Module } from '@nestjs/common';
import { CoreModule} from './core/core.module/core.module';
import { AuthModule } from './models/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './core/guards/auth-guards';


@Module({
  imports: [ CoreModule, AuthModule,
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ]
})
export class AppModule {}
