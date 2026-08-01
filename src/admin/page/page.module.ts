import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PageName, PageNameSchema } from './schemas/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageName.name, schema: PageNameSchema },
    ]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}


