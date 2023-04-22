import * as React from 'react'
import './index.scss'
import { Icon, Stack, Text } from '@fluentui/react'

export interface IServiceCard extends React.AllHTMLAttributes<HTMLElement>{
    iconName: string;
    name: string;
    description: string;
}

export const ServiceCard = (props: IServiceCard) => {

    return(
        <Stack className="card-container">
                <Stack className="card-header" horizontal verticalAlign="center">
                    <Icon className="card-icon" iconName={props.iconName} />
                    <Text className="card-title">{props.name}</Text>                    
                </Stack>
                <Text className="card-description">{props.description}</Text>
            </Stack>
    )
}
