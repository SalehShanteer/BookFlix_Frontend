export interface NavChildItem {
  id: string;
  title: string;
  route: string;
  description?: string;
  icon?: string;
  iconColor?: string;
}

export interface NavItem {
  id: string;
  title: string;
  menuTitle: string;
  route?: string;
  icon?: string;
  children?: NavChildItem[];
}
