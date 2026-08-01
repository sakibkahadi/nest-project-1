import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Message } from 'src/common/decorators/message/message.decorator';
import { CreatePageNameDto } from './dto/create-page.dto';
import { PageService } from './page.service';
import { ShowPageDto } from './dto/show-page.dto';
import { UpdatePageNameDto } from './dto/update-page.dto';
import { DeletePageNameDto } from './dto/delete-page.dot';

@Controller('admin/page-name')
export class PageController {
  constructor(private readonly pageNameService: PageService) {}

  @Post('create')
  // this interceptors allow to use formdata
  @Message('Page created successfully')
  create(@Body() payload: CreatePageNameDto) {
    return this.pageNameService.createPage(payload);
  }

  @Post('update')
  @Message('Page updated successfully')
  update(@Body() payload: UpdatePageNameDto) {
    return this.pageNameService.updatePage(payload);
  }

  @Get('list')
  @Message('Page get successfully')
  getAllPageNames() {
    return this.pageNameService.getAllPage();
  }

  @Get('show')
  @Message('Page fetched successfully')
  getPageById(@Query() query: ShowPageDto) {
    return this.pageNameService.getPageById(query);
  }

  @Post('delete')
  @Message('Page deleted successfully')
  // body always return as object so direct uuid cannot be accesd need of destructuire or get as paylaod
  delete(@Body() payload: DeletePageNameDto) {
    return this.pageNameService.deletePage(payload?.uuid);
  }
}
