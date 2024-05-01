export interface TabData {
  title: string;
  content: JSX.Element;
}

export interface TabsProps {
  tabsData: Array<TabData>;
  className?: string;
  onTabChange?: () => void;
}
