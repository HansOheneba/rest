"use client";

import { useSyncExternalStore } from "react";

// A tiny shared store for dishes guests "add to the table" before booking.
export type TableItem = { name: string; price: number; qty: number };

let items: TableItem[] = [];
const listeners = new Set<() => void>();
const EMPTY: TableItem[] = [];

function emit() {
  listeners.forEach((l) => l());
}

export const table = {
  add(name: string, price: number) {
    const found = items.find((i) => i.name === name);
    items = found
      ? items.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i))
      : [...items, { name, price, qty: 1 }];
    emit();
  },
  remove(name: string) {
    items = items
      .map((i) => (i.name === name ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0);
    emit();
  },
  clear() {
    items = [];
    emit();
  },
};

export function useTable() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => items,
    () => EMPTY,
  );
}

export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
