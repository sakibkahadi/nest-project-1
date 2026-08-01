import { Module } from '@nestjs/common';
import { PageModule } from '../page/page.module';

@Module({
  imports: [PageModule, AdminModule],
})
export class AdminModule {}
