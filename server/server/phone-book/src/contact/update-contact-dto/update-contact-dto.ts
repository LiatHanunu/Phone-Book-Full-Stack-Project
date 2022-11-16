import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateContactDto {
    @Field()
    id:number

    @Field()
    firstName:string

    @Field()
    lastName:string

    @Field()
    nickname:string

    @Field()
    address:string
    
    @Field()
    photo:string

    @Field()
    photoStyle:string


    @Field(()=>[String])
    phoneNumbers:string[]
}
