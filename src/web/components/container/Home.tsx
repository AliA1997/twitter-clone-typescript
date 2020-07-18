import React, { useEffect, useState } from 'react';
import SubNavbar from '../presentation/constants/SubNavbar';
import { TabContent, TabPane } from 'reactstrap'; 


const Home: React.FunctionComponent<IHomePropTypes> = (props) => {
    const items = ['For you', 'Trending', 'News', 'Sports', 'Fun', 'Entertainment'];
    const [activeItm, setActiveItm] = useState('1');

    const toggle: Function = (itm: string) => {
        setActiveItm(itm);
    }

    useEffect(() => {
        //Get for you data
        //Get trending data
        //Get news data
        //Get sports data
        //Get fun data
        //Get entertainment data 
    }, [null]);

    return (
        <div>
            <SubNavbar 
                toggle={toggle} 
                items={items} 
                isTabs={true}
                activeColor={'dark-green'}
                color={'white'}
                size="md"
                activeItm={activeItm}
            />
            <TabContent activeTab={activeItm}>
                {
                    items && items.length 
                    ? items.map(itm => (
                        <TabPane>
                            
                        </TabPane>
                        )
                    )
                    : null
                }
            </TabContent>
        </div>
    );
}

interface IHomePropTypes {
    currentUser: object;
    forYouData: object[];
    trendingData: object[];
    newsData: object[];
    sportsData: object[];
    funData: object[];
    entertainmentData: object[];
}

export default Home;