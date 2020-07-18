import { app } from '../server';
import OrmService from '../OrmService';
import { User } from '../models/user/User';
import { Equal } from 'typeorm';

var obj = {
    getUsers: async (req, res) => {
        const ormService = new OrmService(req, User),
              itemsToSkip = req.query.skip ? req.query.skip : 0,
              opts = itemsToSkip !== 0 ? { take: 100, skip: itemsToSkip } : { take: 100 },
              allUsers = await ormService.query(opts); 
        
        return res.json({users: allUsers});
    },
    getUser: async (req, res) => {
        const ormService = new OrmService(req, User),
              user_id = req.params.user_id,
              opts = { id: Equal(user_id) },
              user = await ormService.query(opts); 
        
        return res.json({user: user});
    },
    registerUser: async (req, res) => {
        const ormService = new OrmService(req, User);

        var user: User = new User();
        user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            avatar: req.body.avatar,
            avatarBackground: req.body.avatarBackground,
            age: req.body.age,
            birth_place: req.body.birth_place,
            email: req.body.email,
            username: req.body.username,
            phone_number: req.body.phone_number,
            password: req.body.password,
            rants: []
        };

        const userToReturn = await ormService.register({user: user});
        return res.json({user: userToReturn});
    },
    loginUser: async (req, res) => {
        const ormService = new OrmService(req, User),
              user = await ormService.login(req.query.id, req.body.password);
            
        if(!user) {
            res.error({
                error: new Error("User not found.")
            });
        }
        req.session.save(user);
        return res.json({
            success: true,
            user: user
        });
    },
    updateUser: async (req, res) => {
        const ormService = new OrmService(req, User),
              userToUpdate = await ormService.query({id: Equal(req.query.id) });

        var updatedUser: User = new User();
        updatedUser = {
            ...userToUpdate,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            avatar: req.body.avatar,
            avatarBackground: req.body.avatarBackground,
            age: req.body.age,
            birth_place: req.body.birth_place,
            email: req.body.email,
            phone_number: req.body.phone_number,
            date_updated: new Date(),
        };
        await ormService.update({models: updatedUser, modelId: req.query.id});
        delete updatedUser.password;
        req.session.save(updatedUser);
        res.json({
            user: updatedUser
        });
    },
};

export default () => {
    app.get('/api/users', obj.getUsers);
};