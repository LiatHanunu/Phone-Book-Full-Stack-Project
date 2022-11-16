import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/typeorm';
import { ContactResolver } from './contact.resolver';
import { ContactsService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactsService,ContactResolver]
})
export class ContactsModule {}
