import "reflect-metadata";
/* types services,repository and http */
const TYPES = {
    HttpUtil: Symbol('HttpUtil'),
    WelcomeService: Symbol('WelcomeService'),
    UserRepository: Symbol('UserRepository'),
    Controller: Symbol('Controller')
};

export default TYPES;