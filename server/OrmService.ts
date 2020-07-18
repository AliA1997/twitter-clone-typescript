import bcrypt from 'bcrypt';
import { Equal, getRepository, getManager } from 'typeorm';
import { User } from './models/user/User';

function PasswordHasher(password: string) {
    this.password = password;
    this.saltRounds = 12;
    this.hashedPassword = null;
}

PasswordHasher.prototype.changePassword = function(password: string) {
    this.password = password;
}

PasswordHasher.prototype.hash = async function() {
    return bcrypt.genSalt(this.saltRounds)
        .then((saltData) => {
         return bcrypt.hash(this.password, saltData) 
            .then((hashedPassword) => {
                this.hashedPassword = hashedPassword;
                return this.hashedPassword;
            });
    });
}

PasswordHasher.prototype.hash = async function(saltRounds: number) {
    this.saltRounds = saltRounds;
    return bcrypt.genSalt(this.saltRounds)
        .then((saltData) => {
            return bcrypt.hash(this.password, saltData)
                .then((hashedPassword) => {
                    this.hashedPassword = hashedPassword;
                    return this.hashedPassword;
                });
        });
}

PasswordHasher.prototype.doPasswordsMatch = async function(hash: string){
    return bcrypt.compare(this.password, hash)
        .then((result) => {
            return result;
        });
}

function OrmService(req: any, defaultModal?: Function) {
    this.req = req;
    this.connection = req.app.get('db');
    this.manager = getManager();
    if(defaultModal) this.repository = getRepository(defaultModal);
    else this.repository = null;
}



OrmService.prototype.query = async function(options, model) {
    if(model) this.repository = getRepository(model);
    var result = await this.repository.find(options);
    console.log("Result:", result);
    // console.log("result-------------------", result);
    return result;
}


OrmService.prototype.create = async function(options, model) {
    if(model) this.repository = getRepository(model);
    if(Array.isArray(options.models)) {
        await this.repository.insert(options.models);
    } else {
        await this.repository.insert([options.models]);
    }
}

OrmService.prototype.register =  async function(options) {
    const hasher = new PasswordHasher(options.user.password);
    options.user.password = await hasher.hash();
    if(Array.isArray(options.user)) {
        await this.repository.insert(options.user);
    } else {
        await this.repository.insert([options.user]);
    }
    const userToReturn = await this.repository.find({email: Equal(options.user.email)});
    delete userToReturn.password;
    return userToReturn;
}

OrmService.prototype.login =  async function(user_id, password) {
    
    const user = this.query({id: Equal(`${user_id}`)}),
          hasher = new PasswordHasher(password),
          doPasswordsMatch = hasher.doPasswordsMatch(user.password);

    if(doPasswordsMatch) {
        delete user.password;
        return user;
    } else {
        throw Error('Passwords does not match.');
    }
}

OrmService.prototype.update = function(options) {
}

OrmService.prototype.delete = function(model) {}


export default OrmService;

export { PasswordHasher };