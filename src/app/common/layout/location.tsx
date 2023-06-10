import { Breadcrumb, IBreadcrumbItem, Stack } from '@fluentui/react';
import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRouteItemByKey, getRouteItemByUrl } from './route.type';
import './location.scss'

export const Location = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const assembleParentItem = (key: string) => {
        const routeItem = getRouteItemByKey(key);
        const item: IBreadcrumbItem = {
            text:'',
            key:''
        };
        if (routeItem.key !== 'route-home'){
            item.key = routeItem.key;
            item.text = routeItem.text
        };
        
        if (routeItem.url){
            item.onClick = () => {
                navigate(routeItem.url)
            }
        } else {
            item.style = { textDecoration: "unset"};
        }        
        return item;
    }

    const assembleBreadItem = React.useCallback(() => {
        const routeItem = getRouteItemByUrl(pathname);        
        const items: IBreadcrumbItem[] = [];

        if(routeItem?.parentKeys?.length)
            routeItem.parentKeys.forEach((key) => {
                items.push(assembleParentItem(key))
            });
        items.push({
        key: routeItem.key,
        text: routeItem.text
        });
        return items;
    },[pathname]);

    return(
        <Stack className='breadcrumbs'
            styles={{
                root: {
                    height: 32,
                    marginBottom: 20,
                }
            }}
        >
            <Breadcrumb
                items={assembleBreadItem()}
            />
        </Stack>
    )
}