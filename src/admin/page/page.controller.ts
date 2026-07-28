import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Message } from 'src/common/decorators/message/message.decorator';
import { CreatePageNameDto } from './dto/create-page.dto';
import { PageService } from './page.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ShowPageDto } from './dto/show-page.dto';
import { UpdatePageNameDto } from './dto/update-page.dto';

@Controller('admin/page-name')
export class PageController {
  constructor(private readonly pageNameService: PageService) {}

  @Post('create')
  // this interceptors allow to use formdata
  @UseInterceptors(AnyFilesInterceptor())
  @Message('Page created successfully')
  create(@Body() payload: CreatePageNameDto) {
    return this.pageNameService.createPage(payload);
  }

  @Post('update')
  @UseInterceptors(AnyFilesInterceptor())
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
}
