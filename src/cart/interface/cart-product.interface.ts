export interface CartProduct {
  id: number;
  quantity: number;
  unit_amount: number;
  total_amount: number;
  discount: number;
  is_gift: boolean;
}
