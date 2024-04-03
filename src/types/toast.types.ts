export type ToastType = 'negative';

export interface ToastData {
  type: ToastType;
  message?: string;
}

export interface ToastStateData extends ToastData {
  id: number;
}