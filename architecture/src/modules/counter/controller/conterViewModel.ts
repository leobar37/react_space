import { useState, useEffect } from "react";
import { useCounterStore } from "../data/useCounterStore";

const { increment, decrement, reset, loadInitialCounter } =
  useCounterStore.getState();

export const useCounterController = () => {
  const { counter } = useCounterStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialCounter();
  }, []);
  useEffect(() => {
    setLoading(!!!counter);
  }, [counter]);

  return {
    decrement,
    increment,
    reset,
    loading,
    count: counter?.value,
  };
};
