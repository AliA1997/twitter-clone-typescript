import { AuthDefaultState } from './interfaces/authInterfaces';
import { RantDefaultState } from './interfaces/rantInterfaces';
import { ResponseDefaultState } from './interfaces/responseInterfaces';
import { SearchDefaultState } from './interfaces/searchInterfaces';

const auth: AuthDefaultState = {
    currentUser: {},
    loginForm: {
        username: '',
        password: ''
    },
    registerForm: {
        first_name: '',
        last_name: '',
        avatar: '',
        avatarBackground: '',
        age: 0, 
        birth_place: '',
        email: '',
        phone_number: ''
    }
};

const rant: RantDefaultState = {
    createRantForm: {
        body: '',
        userId: 0
    },
    updateRantForm: {
        body: '',
        userId: 0
    }
};

const response: ResponseDefaultState = {
    createResponseForm: {
        rantId: 0,
        responseTypeId: 0
    }
};

const search: SearchDefaultState = {
    searchForm: {
        value: "",
        isAdvanceSearch: false,
        hashtagsValue: "",
        languageSelected: undefined,
        includeReplies: false,
        includeLinks: false,
        minimumReplies: undefined,
        minimumLikes: undefined,
        minimumReRants: undefined,
        fromDate: undefined,
        toDate: undefined,
    }
};

export interface IAction {
    type: string,
    payload: Object
};

export default {
    auth: auth,
    rant: rant,
    search: search,
    response: response
};


