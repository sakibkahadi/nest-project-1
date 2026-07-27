import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageName } from './schemas/page.schema';
import { Model } from 'mongoose';
import { CreatePageNameDto } from './dto/create-page.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageName.name) private pageNameModal: Model<PageName>,
  ) {}

  async createPage(payload: CreatePageNameDto): Promise<PageName> {
    const slug = payload.name
      .toLowerCase()
      .replace(/&/g, '')
      .replace(/\s+/g, '-')
      .trim();
    const newPage = new this.pageNameModal({
      uuid: uuidv4(),
      name: payload.name,
      slug,
      status: payload.status,
      position: payload.position,
    });
    return await newPage.save();
  }
}
