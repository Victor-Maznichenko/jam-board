import {useState} from 'react';

import styles from './Tabs.module.scss';

interface TabData {
  title: string;
  content: JSX.Element;
}

interface TabsProps {
  tabsData: Array<TabData>;
  className?: string;
  onTabChange?: () => void;
}

const Tabs = ({tabsData, className = '', onTabChange}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const changeTab = (index: number) => {
    setSelectedTab(index);
    if (!!onTabChange) onTabChange();
  };

  return (
    <div className={`${className} ${styles.tabs}`}>
      <div className={`${styles.links} tabs-top`}>
        {tabsData.map((tabData, index) => (
          <button
            className={`${styles.link} ${index === selectedTab ? 'active' : ''}`}
            style={{width: `${100 / tabsData.length}%`}}
            onClick={() => changeTab(index)}
            type="button"
            key={index}
          >
            {tabData.title}
          </button>
        ))}
      </div>
      <div className="tabs-content">{tabsData[selectedTab].content}</div>
    </div>
  );
};

export default Tabs;
