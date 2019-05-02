import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Plan {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.plans)
    organizer: User;

}
