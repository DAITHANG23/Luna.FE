"use client";
import { useEffect, useRef } from "react";

type CallbackFunction<T extends unknown[]> = (...args: T) => void;

export function useDebouncedCallback<T extends unknown[]>(
  callbackFunc: CallbackFunction<T>,
  wait: number,
) {
  // track args & timeout handle between calls
  const argsRef = useRef<T | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: T) {
    // capture latest args
    argsRef.current = args;

    // clear debounce timer
    cleanup();

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callbackFunc(...argsRef.current);
      }
    }, wait);
  };
}
