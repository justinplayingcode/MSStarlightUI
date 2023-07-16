import React from "react";
import "./index.scss";
import { useNavigate  } from 'react-router-dom';

export interface ITabProps{
    label: string;
    index: number;
    Component: JSX.Element;
}

export interface TabsProps{
    tabs: ITabProps[];
    selectedTab: number;
    onClick: (index: number) => void;
    orientation?: "horizontal" | "vertical";
    className?: string;
}

/**
 * Avalible Props
 * @param className string
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 * @param orientation Tab orientation Vertical | Horizontal
 */

const Tabs = (props: TabsProps) =>{
    const Panel = props.tabs && props.tabs.find((tab) => tab.index === props.selectedTab);
    const navigate = useNavigate();

    return (
        <div
            className={`
                ${props?.orientation === "vertical" ? "tabs-component vertical" : 'tabs-component'} tabs-container
            `}
        >
            <div role="tablist" aria-orientation={props.orientation}>
                {props.tabs.map((tab) => (
                    <button
                        className={props.selectedTab === tab.index ? "active" : ""}
                        onClick={() => {
                          props.onClick(tab.index);
                          navigate(`#tab${tab.index}`)
                        }}
                        key={tab.index}
                        type="button"
                        role="tab"
                        aria-selected={props.selectedTab === tab.index}
                        aria-controls={`tabpanel-${tab.index}`}
                        tabIndex={props.selectedTab === tab.index ? 0 : -1}
                        id={`btn-${tab.index}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div
                role="tabpanel"
                aria-labelledby={`btn-${props.selectedTab}`}
                id={`tabpanel-${props.selectedTab}`}
            >
                {Panel && Panel.Component}
            </div>
        </div>
    );
};
export default Tabs;
