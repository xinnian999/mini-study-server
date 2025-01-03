import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Know } from './know.entity';
import { KnowService } from './know.service';
import { KnowController } from './know.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Know])],
  providers: [KnowService],
  controllers: [KnowController],
})
export class KnowModule {}
