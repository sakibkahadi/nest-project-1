import { Controller, Get } from '@nestjs/common';
import { Message } from 'src/common/decorators/message/message.decorator';

@Controller('admin/page-name')
export class PageController {
  @Message('Page created successfully')
  @Get()
  test() {
    return {
      message: 'Admin page API working',
    };
  }
}
