import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany
} from "typeorm";
import { User } from "./User";

@Entity()
export class Plan {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.organized_plans)
    organizer: User;

    @ManyToMany(type => User, user => user.plans)
    attendees: User[]

}
