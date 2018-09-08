import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { RegistrableController } from "./registerable.controller";
import { WelcomeService } from "../services/welcome.service";
import "reflect-metadata";
import TYPES from "../configuration/types";
import LOGGER from "../configuration/winston";
import * as express from 'express';
import { ROUTE_CONSTANTS } from "../constants/route.constants";

@injectable()
export class WelcomeController implements RegistrableController {

    private welcomeService: WelcomeService;

    constructor(@inject(TYPES.WelcomeService) welcomeService: WelcomeService) {
        this.welcomeService = welcomeService;
    }

    register(app: express.Application): void {
        LOGGER.info('Inside registered !');
        app.get(`${ROUTE_CONSTANTS.REST_SMS_ROUTE}/send/welcome/sms/to/customer/by/:userId`,
            this.sendWelcomeRedSmsToNewCustomer.bind(this));
        app.post(`${ROUTE_CONSTANTS.REST_EMAIL_ROUTE}/send/welcome/email/to/customer/by/:userId`,
            this.sendWelcomeElasticEmailToNewCustomer.bind(this));

    }

    public sendWelcomeElasticEmailToNewCustomer(req: Request, res: Response, next: NextFunction): void {
        LOGGER.info('Inside send Welcome Elastic Email To Customer !');
        let userId = req.params.userId;
        this.welcomeService.sendWelcomeElasticEmailToNewCustomer(userId).subscribe(
            (result: string) => {
                res.send({ data: result })
            },
            (error: any) => {
                LOGGER.error(error);
                res.status(500).send({ message: error })
            }
        )
    }
    public sendWelcomeRedSmsToNewCustomer(req: Request, res: Response, next: NextFunction): void {
        LOGGER.info('Inside send Welcome Red Sms To Customer !');
        let userId = req.params.userId;
        this.welcomeService.sendWelcomeRedSmsToNewCustomer(userId).subscribe(
            (result: string) => {
                res.send({ data: result })
            },
            (error: any) => {
                LOGGER.error(error);
                res.status(500).send({ message: error })
            }
        )
    }

}