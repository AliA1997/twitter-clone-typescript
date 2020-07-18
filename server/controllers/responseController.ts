import { getManager } from 'typeorm';
import { app } from '../server';

var obj = {
    getResponses: (req, res) => {
        var manager = getManager();
        console.log('manager...', manager);
    },
    // getResponsesByRant: (req, res) => {
    //     var manager = getManager();
    //     console.log('manager...', manager);       
    // }
};

export default () => {
    app.get('/api/admin/responses', obj.getResponses);
};