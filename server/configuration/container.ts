import TYPES from './types';
import "reflect-metadata";
import { Container } from 'inversify'
import { RegistrableController } from '../controllers/registerable.controller';
import { HttpUtilImpl } from '../services/impl/http-util-impl';
import { HttpUtil } from '../services/http.util';
import { WelcomeService } from '../services/welcome.service';
import { WelcomeServiceImp } from '../services/impl/welcome-service-impl';
import { UserRepositoryImpl, UserRepository } from '../repositories/user.repository';
import { WelcomeController } from '../controllers/welcome.controller';
;


/* container contain all services,repository and http */
const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(WelcomeController);
container.bind<WelcomeService>(TYPES.WelcomeService).to(WelcomeServiceImp);
container.bind<HttpUtil>(TYPES.HttpUtil).to(HttpUtilImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

export default container;