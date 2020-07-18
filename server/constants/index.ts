import { Equal, LessThanOrEqual, LessThan, MoreThan, MoreThanOrEqual, Like, Between } from 'typeorm';

export const defineSearchQueryOpts: Function = (query) => {
    var newOpts = {};

    var itemsToSkip = query.skip ? query.skip : 0;

    newOpts["take"] = 100;

    if(itemsToSkip !== 0) {
        newOpts["skip"] = itemsToSkip;
    }

    if(query.searchValue) {
        newOpts["body"] = Like(query.searchValue)
        newOpts["user"]["username"] = Like(query.searchValue);
    }

    if(query.fromDate && query.toDate) {
        newOpts["date_created"] = Between(query.fromDate, query.toDate);
    }

    if(query.fromDate && !query.toDate) {
        newOpts["date_created"] = Between(new Date(), query.toDate);
    }

    if(query.minimumLikes) {        
        newOpts["number_of_likes"] = MoreThanOrEqual(query.minimumLikes);
    }

    if(query.maximumLikes) {
        newOpts["number_of_likes"] = LessThanOrEqual(query.maximumLikes);
    }
    
    if(query.minimumReplies) {
        newOpts["number_of_replies"] = MoreThanOrEqual(query.minimumReplies);
    } 
    
    if(query.maximumReplies) {
        newOpts["number_of_replies"] = LessThanOrEqual(query.maximumReplies);
    }

    if(query.minimumRerants) {
        newOpts["number_of_rerants"] = MoreThanOrEqual(query.minimumRerants);
    }

    if(query.maximumRerants) {
        newOpts["number_of_rerants"] = LessThanOrEqual(query.maximumRerants)
    }

    if(query.minimumShares) {
        newOpts["number_of_shares"] = MoreThanOrEqual(query.minimumShares);
    }

    if(query.maximumShares) {
        newOpts["number_of_shares"] = LessThanOrEqual(query.maximumShares);
    }

    return newOpts;
};