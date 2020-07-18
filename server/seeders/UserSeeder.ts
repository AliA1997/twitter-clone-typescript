import OrmService from '../OrmService';
import { User } from '../models/user/User';
 

function UserSeeder(req) {
    this.req = req;
    this.ormService = null;
}

UserSeeder.prototype.Seed = async function() {
    this.ormService = new OrmService(this.req, User);
    // console.log('ormService request---------', this.ormService.req)
    // console.log('ormService repository---------', this.ormService.repository)
    var testUser1 = new User(), testUser2 = new User(), testUser3 = new User(), testUser4 = new User(), testUser5 = new User();
    testUser1 = {
        first_name: 'Ali',
        last_name: 'Alhaddad',
        avatar: '',
        avatarBackground: '',
        age: 23, 
        birth_place: 'Los Angeles, CA',
        email: 'devmtnali@gmail.com',
        phone_number: '813-405-5375',
        rants: null,
        id: 1,
        date_created: new Date(),
        date_updated: null,
        date_deleted: null,
        password: "Password-1"
    };
    testUser2 = {
        first_name: 'James',
        last_name: 'Thomas',
        avatar: '',
        avatarBackground: '',
        age: 59, 
        birth_place: 'Santa Monica, CA',
        email: 'aabiz1997@gmail.com',
        phone_number: '000-000-0000',
        rants: null,
        id: 2,
        date_created: new Date(),
        date_updated: null,
        date_deleted: null,
        password: "Password-2"
    };
    testUser3 = {
        first_name: 'Gary',
        last_name: 'Austin',
        avatar: '',
        avatarBackground: '',
        age: 22, 
        birth_place: 'Corona, CA',
        email: 'gary@gmail.com',
        phone_number: '111-222-3456',
        rants: null,
        id: 3,
        date_created: new Date(),
        date_updated: null,
        date_deleted: null,
        password: "Password-3"
    };
    testUser4 = {
        first_name: 'Larry',
        last_name: 'Hoover',
        avatar: '',
        avatarBackground: '',
        age: 26, 
        birth_place: 'Chicago, IL',
        email: 'larry@gmail.com',
        phone_number: '642-231-5356',
        rants: null,
        id: 4,
        date_created: new Date(),
        date_updated: null,
        date_deleted: null,
        password: "Password-4"
    };
    testUser5 = {
        first_name: 'Louis',
        last_name: 'Hoover',
        avatar: '',
        avatarBackground: '',
        age: 53, 
        birth_place: 'Seattle, WA',
        email: 'louis@gmail.com',
        phone_number: '642-432-3234',
        rants: null,
        id: 5,
        date_created: new Date(),
        date_updated: null,
        date_deleted: null,
        password: "Password-5"
    };
    try {
        const allUsers = await this.ormService.query({take: 10});
        if(!allUsers || !allUsers.length) {
            await this.ormService.register({ user: testUser1 });
            await this.ormService.register({ user: testUser2 });
            await this.ormService.register({ user: testUser3 });
            await this.ormService.register({ user: testUser4 });
            await this.ormService.register({ user: testUser5 });
            return console.info("User Data Seeded");
        }
        return console.info("No need to seed user data");
    } catch(error) {
        console.error("User seeding error:", error);
    }
}

export default UserSeeder;