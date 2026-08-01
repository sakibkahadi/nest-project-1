import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageName, Status } from './schemas/page.schema';
import { Model } from 'mongoose';
import { CreatePageNameDto } from './dto/create-page.dto';
import { v4 as uuidv4 } from 'uuid';
import { ShowPageDto } from './dto/show-page.dto';
import { UpdatePageNameDto } from './dto/update-page.dto';

export function formatTitle(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
export function createSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageName.name) private pageNameModal: Model<PageName>,
  ) {}

  async createPage(payload: CreatePageNameDto): Promise<PageName> {
    const name = formatTitle(payload.name);
    const slug = createSlug(name);
    const isPageNameAlreadyExist = await this.pageNameModal.findOne({
      slug,
    });
    if (isPageNameAlreadyExist) {
      throw new BadRequestException('Page name already exist');
    }

    const newPage = new this.pageNameModal({
      uuid: uuidv4(),
      name,
      slug,
      status: payload.status,
      position: payload.position,
    });
    return await newPage.save();
  }

  async getAllPage(): Promise<PageName[]> {
    return this.pageNameModal
      .find({ status: Status.ACTIVE })
      .sort({ position: 1 })
      .exec();
  }

  async getPageById(query: ShowPageDto): Promise<PageName> {
    if (!query?.uuid) {
      throw new BadRequestException('UUID is required');
    }
    const page = await this.pageNameModal.findOne({ uuid: query.uuid }).exec();
    if (!page) {
      {
        {
          throw new NotFoundException('Page not exist');
        }
      }
    }
    return page;
  }

  async updatePage(payload: UpdatePageNameDto): Promise<PageName> {
    // check if paylaod have uuid
    if (!payload?.uuid) {
      throw new BadRequestException('UUID is required');
    }
    const isUUIDExist = await this.pageNameModal.findOne({
      uuid: payload.uuid,
    });
    if (!isUUIDExist) {
      throw new NotFoundException('page is not found');
    }

    if (payload.name) {
      const name = formatTitle(payload.name);
      const slug = createSlug(name);
      const isPageNameAlreadyExist = await this.pageNameModal.findOne({
        // check slug and slug uuid is not the paylaod uuid means this check to anothe slug and that slug uuid is matching or not
        slug,
        uuid: { $ne: payload.uuid },
      });
      if (isPageNameAlreadyExist) {
        throw new BadRequestException('Page name already exists');
      }
      isUUIDExist.name = name;
      isUUIDExist.slug = slug;
    }

    if (payload.status !== undefined) {
      isUUIDExist.status = payload.status;
    }

    if (payload.position !== undefined) {
      isUUIDExist.position = payload.position;
    }

    return await isUUIDExist.save();
  }

  async deletePage(uuid: string): Promise<[]> {
    if (!uuid) {
      throw new BadRequestException('UUID is required');
    }
    const page = await this.pageNameModal.findOne({
      uuid: uuid,
      isDeleted: false,
    });
    if (!page) {
      throw new NotFoundException('page is not found');
    }
    page.isDeleted = true;
    page.status = Status.INACTIVE;
    await page.save();
    return [];
  }
}
