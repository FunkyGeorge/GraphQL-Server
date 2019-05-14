import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Plan } from "./Plan";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @OneToMany((type) => Plan, (plan) => plan.organizer)
    organizedPlans: Plan[];

    @ManyToMany((type) => Plan, (plan) => plan.attendees)
    plans: Plan[];

}
