/**
 * 未弃置物品
 */
export interface Item {
  item_id: number;
  item_name: string;
  items_count: number;
  user_id: number;
  is_disposed: boolean;
}

/**
 * 已弃置物品
 */
export interface DisposedItem{
  item_id: number;
  disposed_way: number;
  disposed_at: Date;
  user_id: number;
  moment_sense: string;
}