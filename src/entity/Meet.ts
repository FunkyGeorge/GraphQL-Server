import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Meet {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.meets)
    organizer: User;

}
