import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


//This is the entity of the contact table. 

@Entity()
@ObjectType()
export class Contact {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({
    nullable: true,
    default: '',
  })
  firstName: string;

  @Field()
  @Column({
    nullable: true,
    default: '',
  })
  lastName: string;

  @Field()
  @Column({
    nullable: true,
    default: '',
  })
  nickname: string;

  @Field()
  @Column({
    nullable: true,
    default: '',
  })
  address: string;

  @Field()
  @Column({
    nullable: true,
    default: '',
  })
  photo: string;

  @Field()
  @Column({
    nullable: true,
    default: '',
  })
  photoStyle: string;


  @Field(()=>[String])
  @Column("text",{
    array: true,
    nullable: true,
    default: []
  })
  phoneNumbers: string[];
}
