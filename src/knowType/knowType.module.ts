import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowTypeService } from './knowType.service';
import { KnowType } from './knowType.entity';
import { KnowTypeController } from './knowType.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KnowType])],
  providers: [KnowTypeService],
  controllers: [KnowTypeController],
})
export class KnowTypeModule { }