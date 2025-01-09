import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Know } from './know.entity';
import { KnowService } from './know.service';
import { KnowController } from './know.controller';
import { UploadModule } from 'src/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Know]), UploadModule('know')],
  providers: [KnowService],
  controllers: [KnowController],
})
export class KnowModule {}
