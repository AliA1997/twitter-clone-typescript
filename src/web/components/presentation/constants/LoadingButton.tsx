import React from 'react';
import { Button, Spinner } from 'reactstrap';

const LoadingButton: React.FunctionComponent<ILoadingButtonProps> = (props) => {
    if(props.onClickFunc) 
        return (
            <Button
                size={props.size}
                disabled={props.loading || props.disabled}
                onClick={e => props.onClickFunc ?  props.onClickFunc(e) : console.log(e)}
                type={"button"}
            >
                {props.loading && <Spinner className="mr-2" size="sm"/>}
                {props.text}
            </Button>
        );
    else 
        return (
            <Button
                size={props.size}
                disabled={props.loading || props.disabled}
                type={"submit"}
            >
                {props.loading && <Spinner className="mr-2" size="sm"/>}
                {props.text}
            </Button>
        );
}

interface ILoadingButtonProps {
    loading: boolean;
    text: string;
    size: string;
    disabled: boolean;
    type?: string;
    onClickFunc?: Function;
}

export default LoadingButton;