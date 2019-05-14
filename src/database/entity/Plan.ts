import {
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Plan {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.organizedPlans)
    organizer: User;

    @ManyToMany((type) => User, (user) => user.plans)
    attendees: User[];

}
