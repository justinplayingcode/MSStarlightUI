import { Breadcrumb, IBreadcrumbItem, Stack } from '@fluentui/react';
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteItemByKey, getRouteItemByUrl } from './route.type';
import './location.scss'

export const Location = () => {
    const { pathname } = useLocation();

    const assembleParentItem = (key: string) => {
        const routeItem = getRouteItemByKey(key);
        const item: IBreadcrumbItem ={
            key: routeItem.key,
            text: routeItem.text
        };
        if (routeItem.url){
            item.href = `#${routeItem.url}`;
        } else {
            item.style = { textDecoration: "unset"};
        }
        return item;
    }

    const assembleBreadItem = React.useCallback(() => {
        const routeItem = getRouteItemByUrl(pathname);
        const items: IBreadcrumbItem[] = [];
        if( routeItem?.parentKeys?.length){
            routeItem.parentKeys.forEach((key) => {
                items.push(assembleParentItem(key))
            });
        }
        items.push({
            key: routeItem.key,
            text: routeItem.text
        });
        return items;
    },[pathname]);

    return(
        <Stack className='breadcrumbs'>
            <Breadcrumb
                styles={{ root: { height: 32, margin: 0} }}
                items={assembleBreadItem()}
            />
        </Stack>
    )
}