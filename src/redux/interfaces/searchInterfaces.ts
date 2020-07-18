export interface SearchForm {
    value?: string;
    isAdvanceSearch?: boolean;
    hashtagsValue?: string;
    languageSelected?: string;
    includeReplies?: boolean;
    includeLinks?: boolean;
    minimumReplies?: number;
    minimumLikes?: number;
    minimumReRants?: number;
    fromDate?: Date;
    toDate?: Date;
}

export interface SearchDefaultState {
    searchForm: SearchForm,
}