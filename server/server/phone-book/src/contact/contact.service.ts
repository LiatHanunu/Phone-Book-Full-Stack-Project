import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/typeorm';
import { Repository } from 'typeorm';
import { ContactDto } from './creat-contact-dto/creat-contact-dto';


@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact) private readonly contactRipo: Repository<Contact>,
    ) { }

    //creates new contact
    async createContact(newContact: ContactDto): Promise<Contact> {
        const newUser = this.contactRipo.create(newContact);
        return this.contactRipo.save(newUser);
    }

    //finds one contact by id
    findContactById(id: number) {
        return this.contactRipo.findOneBy({ id: id });
    }

    //retuns all contacts
    findAllContacts() {
        return this.contactRipo.find()
    }

    //update contact data
    async update(id: number, input: ContactDto): Promise<Contact> {
        const contact = await this.contactRipo.findOne({ where: { id } });
        if (contact) {
            contact.firstName = input.firstName;
            contact.lastName = input.lastName;
            contact.nickname = input.nickname;
            contact.photo = input.photo;
            contact.photoStyle = input.photoStyle
            contact.phoneNumbers = input.phoneNumbers;
            return await this.contactRipo.save(contact);
        }
    }

    //delete a contact
    async delete(id: number): Promise<any> {
        return await this.contactRipo.delete({ id })
    }
}