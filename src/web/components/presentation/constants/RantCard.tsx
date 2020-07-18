import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';

const RantCardComponent: React.FunctionComponent<IRantCardComponentProps> = (props) => (
    <Card style={{width: props.width ? props.width : '80%'}}>
        <CardBody>
            <CardTitle>{props.title}</CardTitle>
            <CardSubtitle>{props.subtitle}</CardSubtitle>
        </CardBody>
        <CardBody>
            <CardText>{props.description}</CardText>
        </CardBody>
    </Card>
);

interface IRantCardComponentProps {
    title: string;
    subtitle: string;
    description: string;
    width?: string;
}

export default RantCardComponent;