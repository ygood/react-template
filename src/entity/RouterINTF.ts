export interface RouterINTF {
  path?: string;
  key?: string;
  title?: string;
  icon?: any;
  component?: any;
  meta?: MeatINTF;
  redirect?: string;
  children?: RouterINTF[];
}

export interface MeatINTF {
  authentication?: boolean;
}
