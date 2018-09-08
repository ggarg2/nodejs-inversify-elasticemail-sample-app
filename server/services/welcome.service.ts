import { Observable } from "rxjs/internal/Observable";
import 'reflect-metadata';
/* Welcome service implementation interface */
export interface WelcomeService {
    /* Welcome service implementation interface for sending the Elastic Mails to the customer */
    sendWelcomeElasticEmailToNewCustomer(userId: string): Observable<string>
    /* Welcome service implementation interface for sending the Red Sms to the customer */
    sendWelcomeRedSmsToNewCustomer(userId: string): Observable<string>
}