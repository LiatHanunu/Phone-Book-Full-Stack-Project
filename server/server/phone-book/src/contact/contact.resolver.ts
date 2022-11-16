
import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { generateUploadURL } from "src/s3";

// import { generateUploadURL } from "src/s3";
import { Contact } from "src/typeorm";
import { ContactsService } from "./contact.service";
import { ContactDto } from "./creat-contact-dto/creat-contact-dto";
import { UpdateContactDto } from "./update-contact-dto/update-contact-dto";






@Resolver(() => Contact)
export class ContactResolver {
    constructor(
        private contactsService: ContactsService,
    ) { }


    //returns one contact by id
    @Query(() => Contact, { name: 'findOneContact' })
    async findOne(@Args('id', { type: () => Int }) id: number) {
        return this.contactsService.findContactById(id);
    }

    //sends secured url for the client to upload images to the aws-s3 bucket
    @Query(() => String, { name: 'getUploadUrl' })
    async getUrl() {
        const url = await generateUploadURL()
        return url
    }

    //returns all contacts
    @Query(() => [Contact], { name: 'findAllContacts' })
    async findAll() {
        return await this.contactsService.findAllContacts();
    }

    //creates new contact
    @Mutation(() => Contact, { name: 'createContact' })
    createContact(@Args('createContactInput') createContactInput: ContactDto) {
        return this.contactsService.createContact(createContactInput)
    }

    // update contact data
    @Mutation(() => Contact, { name: 'updateProject' })
    updateProject(@Args('updateProjectInput') updateProjectInput: UpdateContactDto) {
        return this.contactsService.update(updateProjectInput.id, updateProjectInput);
    }


    //delete contact
    @Mutation(() => String, { name: 'removeContact' })
    removeContact(@Args('id', { type: () => Int }) id: number) {
        this.contactsService.delete(id);
        return ''
    }
}