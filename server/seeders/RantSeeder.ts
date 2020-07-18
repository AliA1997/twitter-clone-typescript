import OrmService from '../OrmService';
import { Rant } from '../models/rants/Rant';
import { LkResponseType } from '../models/rants/LkResponseType';
import { User } from '../models/user/User';

function RantSeeder(req) {
    this.req = req;
    this.ormService = null;
}

RantSeeder.prototype.Seed = async function(){
    this.ormService = new OrmService(this.req, User);

    try {
        const allRants = await this.ormService.query({ take: 10 }, Rant);
        if(!allRants || !allRants.length) {
            const users: User[] = await this.ormService.query({ take: 10 }, User);
            console.log("Users Rant Seeder:", users);
            for(let i: number = 0; i < 5; i++) {
                users.forEach(async (user: User, userIdx: number) => {
                    var newRant: Rant = new Rant();
                    newRant = {
                        id: Math.floor(Math.random() * 100),
                        body: `Test Rant: ${userIdx + 1}`,
                        user_id: user.id,
                        number_of_responses: 0,
                        date_created: new Date(),
                        date_updated: null,
                        date_deleted: null
                    };
                    await this.ormService.create({ models: newRant }, Rant);
                });
                i++;
            }
        
            console.info("Rant Data Seeded");
        } else {
            console.info("No need to seed Rant Data.");
        }

        const allResponseTypes = this.ormService.query({take: 10}, LkResponseType);
        if(!allResponseTypes || !allResponseTypes.length) {
            var newResponseType1 = new LkResponseType(), newResponseType2 = new LkResponseType(), newResponseType3 = new LkResponseType(), newResponseType4 = new LkResponseType();
            newResponseType1 = {
                type: 'Reply',
                type_description: 'Replies to a rant',
                date_created: new Date(),
                date_updated: null,
                date_deleted: null
            };
            newResponseType2 = {
                type: 'Like',
                type_description: 'Likes a rant.',
                date_created: new Date(),
                date_updated: null,
                date_deleted: null
            };
            newResponseType3 = {
                type: 'Re Rant',
                type_description: 'Post rant on profile.',
                date_created: new Date(),
                date_updated: null,
                date_deleted: null
            };
            newResponseType4 = {
                type: 'Share',
                type_description: 'Number of shares on rant.',
                date_created: new Date(),
                date_updated: null,
                date_deleted: null
            };
            this.ormService.create({models: [newResponseType1, newResponseType2, newResponseType3, newResponseType4]}, LkResponseType);
            return;
        } else {
            return;
        }
    } catch(error) {
        console.error("Rant Seeder Error:", error);
    }
}

export default RantSeeder;