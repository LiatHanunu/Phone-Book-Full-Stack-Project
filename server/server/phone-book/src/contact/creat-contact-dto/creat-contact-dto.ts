import { Field, InputType  } from "@nestjs/graphql"

@InputType()
export class ContactDto {
    @Field()
    firstName:string

    @Field()
    lastName:string

    @Field()
    nickname:string

    @Field()
    title:string

    @Field()
    address:string
    
    @Field()
    photo:string

    @Field()
    photoStyle: string;

    @Field(()=>[String])
    phoneNumbers:string[]
}

