import { ObjectType, Field, InputType, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

@InputType()
export class UserInput {

    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}