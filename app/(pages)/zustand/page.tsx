"use client"
import { useShopStore } from "@/store";

export default function ZustandPage() {
  const {isOpen} = useShopStore();

  return (
    <div>
      <h1>Hello Page</h1>
      {JSON.stringify(isOpen)}
    </div>
  );
}