import { INavLinkGroup, INavStyles, Image, ImageFit, Nav, Stack } from '@fluentui/react'
import * as React from 'react'
import './index.scss'
import { useEffect } from 'react';
import { accountRole } from 'model';
import { getNavList } from './index.type';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { updateSelectedMenu } from 'src/redux/reducers';
import { useNavigate } from 'react-router';

export interface INavigationProps{
    
}

export interface INavListProps{
    name: string,
    icon: string,
    description: string,
    url: string,
    imageUrl: string
}

 export const Navigation = (props: INavigationProps) => {
    
    const [selectedKey, setSelectedKey] = React.useState<string>("")

    const [role, setRole] =React.useState<accountRole>(accountRole.Admin);
    const [navGroup, setNavGroup] = React.useState<INavLinkGroup[]>([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {selectedMenu} = useSelector((state: RootState) => state.navigation)

    const navStyles: Partial<INavStyles> = {
        root: {
            boxSizing: 'border-box',
            overflowY: 'auto',
        },
    };

    useEffect(() => {
        assembleTopNavLinkGroups(getNavList(role, false));
        setSelectedKey(selectedMenu)
    },[])

    useEffect(() => {
        if(navGroup.length){
            setSelectedKey(navGroup[0].links[0].key);
        }
    },[])

    useEffect(() => {
        setSelectedKey(selectedMenu)
    },[selectedMenu])

    useEffect(() => {
        if(navGroup.length){
            setSelectedKey(navGroup[0].links[0].key);
        }
    },[navGroup])

    const assembleTopNavLinkGroups = (list: INavListProps[]) => {
        const groups: INavLinkGroup[] = [
            {
                links:[]
            }
        ];
        list.map((item, index) => {
            groups[0].links.push({
                name: item.name,
                icon: item.icon,
                url: item.url,
                key: `key${index}`,
                onClick: (ev, item ) => {
                    ev.preventDefault();
                    navigate(item.url)
                    dispatch(updateSelectedMenu(item.key))
                }
            })
        });        
        setNavGroup(groups);
        
    }

    return (
        <Stack className="left-content">
            <Image className='logo' imageFit={ImageFit.cover} src='https://res.cloudinary.com/dipiauw0v/image/upload/v1682052619/DATN/Hospital_logo_ymn2vi.png'/>
            <Nav
                className="top-nav"
                selectedKey={selectedKey}
                styles={navStyles}
                groups={navGroup}
                onRenderGroupHeader={(p, r) => (
                    <Stack className="header-container">
                        <Stack className="nav-header">{p!.name}</Stack>
                    </Stack>
                )}
            />
        </Stack>
    )
};