import OrmService from '../OrmService';
// import { get } from 'typeorm';
import { Topic } from '../models/topics/Topic';
import { LkTopicType } from '../models/topics/LkTopicType';
import { LkSubTopicType } from '../models/topics/LkSubTopicType';
// import { Any } from 'typeorm';
import { addDays } from 'date-fns';
import axios from 'axios';

export interface ITopicSeeder {
    Seed: Function;
    req: any;
    ormService?: any;
}

function TopicSeeder(req){
    this.req = req;
    this.ormService = null;
}

TopicSeeder.prototype.Seed = async function() {
    this.ormService = new OrmService(this.req);
    var self = this;
    try {
        const allTopicTypes: LkTopicType[] = await this.ormService.query({ take: 10 }, LkTopicType);
        if(!allTopicTypes || !allTopicTypes.length) {
            const lkTopicTypes: string[] = ["For You", "Trending", "News", "Politics", "Sports", "Fun", "Entertainment", "Music"];
            lkTopicTypes.forEach(async (lkTopicType: string, lkTopicTypeIdx: number) => {
                var newLkTopicType: LkTopicType = new LkTopicType();
                newLkTopicType = {
                    id: lkTopicTypeIdx + 1,
                    type: lkTopicType,
                    type_description: "General topic",
                    date_created: new Date(),
                    date_updated: null,
                    date_deleted: null
                };
                await self.ormService.create({models: newLkTopicType}, LkTopicType);
            });

            const entertainmentSubTopics: string[] = ["Movies", "Television", "In memoriam", "Celebrity", "billboard"],
                  sportsSubTopics: string[] = ["NFL", "NHL", "NBA", "MLB", "Golf", "Premier League", "NCAA basketball", "Formula One"],
                  funSubTopics: string[] = ["Animals", "Holidays", "Cute"],
                  newsSubTopics: string[] = ["US news", "UK news", "World news", "Business", "COVID-19", "Social action"],
                  politicsSubTopics: string[] = ["Politics"],
                  allSubTopics = [
                      ...entertainmentSubTopics.map(est => ({type: est, parent_topic_id: 7})), 
                      ...funSubTopics.map(tst => ({type: tst, parent_topic_id: 6})),
                      ...sportsSubTopics.map(sst => ({type: sst, parent_topic_id: 5})),
                      ...politicsSubTopics.map(pst => ({type: pst, parent_topic_id: 4})),
                      ...newsSubTopics.map(nst => ({type: nst, parent_topic_id: 3}))
                  ];

            allSubTopics.forEach(async (subTopic: any, subTopicIdx: number, array: any[]) => {
                var newSubTopic: LkSubTopicType = new LkSubTopicType(),
                    trendingSubTopic: LkSubTopicType = new LkSubTopicType();

                newSubTopic = {
                    id: subTopicIdx + 1,
                    type: subTopic.type,
                    parent_topic_id: subTopic.parent_topic_id,
                    date_created: new Date(),
                    date_updated: null,
                    date_deleted: null
                };
                trendingSubTopic = {
                    id: array.length + (subTopicIdx + 1),
                    type: `${subTopic.type} - Trending`,
                    parent_topic_id: 2,
                    date_created: new Date(),
                    date_updated: null,
                    date_deleted: null
                };

                await self.ormService.create({models: [newSubTopic, trendingSubTopic]}, LkSubTopicType);
            });
            console.info("Lk Topic Data Seeded");
        } else {
            console.info("No need to seed lk topic data");
        }
        const allTopics: Topic[] = await this.ormService.query({take: 10}, Topic),
              topicTypes: LkTopicType[] = await this.ormService.query({take: 10}, LkTopicType);
            
        if(!allTopics || !allTopics.length) {
            topicTypes.forEach(async (topicType: any) => {
                var currentNumberOfTopics: number = 0;
                var newsStories: any = await axios.get(
                        `https://gnews.io/api/v3/search?token=9af7f07379c9bf36aaef1b918967fd19&country=us&max=10&q=${topicType.type}`
                    );
                newsStories = newsStories.data;
                newsStories.articles.forEach(async (article: any, articleId: number) => {
                    var newTopic: Topic = new Topic(),
                        expireDate: Date = addDays(new Date(), 1);
                    console.log(expireDate);
                    newTopic = {
                        name: article.title,
                        description: article.description,
                        expires: expireDate,
                        lk_topic_id: topicType.id,
                        date_created: new Date(),
                        date_updated: null,
                        date_deleted: null
                    };
                    await self.ormService.create({models: newTopic}, Topic);
                });
                currentNumberOfTopics += 10;
            });
            console.info("Topic Data Seeded");
        } else {
            console.info("No need to seed topic data");
        }
    } catch(error){
        console.error('Topic Seeder Error');
    }
}

export default TopicSeeder;