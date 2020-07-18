import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const SubNavbar: React.FunctionComponent<ISubNavbarProps> = (props: any) => {
    const [activeItm, setActiveItm] = useState(props.links[0]);

    const toggle: Function = (tab: string) => {
        if(activeItm !== tab) setActiveItm(tab);
    }

    if(props.isTabs) 
        return (
            <Nav tabs>
                {
                    props.links && props.links.length 
                    ? props.links.map((l: string, idx: number) => (
                        <NavItem>
                            <NavLink 
                                className={`${activeItm == idx ? props.activeColor : props.color}`}
                                toggle={() => props.toggle(l)}
                            >
                                {l}
                            </NavLink>
                        </NavItem>
                        )
                      )
                    : null
                }
            </Nav>
        );
    else 
        return (
            <Nav>

            </Nav>
        );
}

interface ISubNavbarProps {
    isTabs: boolean;
    items: string[];
    activeColor: string;
    color: string;
    size: string;
    activeItm: string;
    toggle: Function;
}

export default SubNavbar;