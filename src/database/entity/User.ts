import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
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

    @OneToMany(type => Plan, plan => plan.organizer)
    organized_plans: Plan[];

    @ManyToMany(type => Plan, plan => plan.attendees)
    plans: Plan[]

}
