import OrmService from '../OrmService';
import { Rant } from '../models/rants/Rant';
import * as constants from '../constants';
import { app } from '../server';
import { Equal } from 'typeorm';

var obj = {
    getRants: async (req, res) => {
        
        const ormService = new OrmService(req, Rant),
              searchQueryOpts = constants.defineSearchQueryOpts(req.query),
              allRants = await ormService.query(searchQueryOpts); 
        
        res.json({users: allRants});
    },
    getRant: async (req, res) => {
        const ormService = new OrmService(req, Rant),
              opts = { id: Equal(`${req.query.rant_id}`) },
              rant = await ormService.query(opts);
        
        res.json({rant: rant})
    },
    createRant: async (req, res) => {
        const ormService = new OrmService(req, Rant);

        var newRant = new Rant();
        newRant = {
            body: req.body.text,
            user_id: req.body.user_id,
            number_of_likes: 0,
            number_of_replies: 0,
            number_of_rerants: 0,
            number_of_shares: 0,
            date_created: new Date(),
            date_updated: null, 
            date_deleted: null
        };

        await ormService.create({models: newRant}, Rant);
        res.json({success: true});
    },
};

export default () => {
    app.get('/api/rants', obj.getRants);
    app.get('/api/rants/:rant_id', obj.getRant);
    app.post('/api/rants', obj.createRant);
};