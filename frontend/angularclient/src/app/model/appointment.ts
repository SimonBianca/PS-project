import { Account } from "./account";
import { Service } from "./service";

export class Appointment {
    id:number;
    date: Date;
    account: Account;
    services: Service[];
    status:string;
    accountUsername:string;

}
