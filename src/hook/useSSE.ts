"use client";
import { useState, useEffect, useRef } from 'react';

export type SSEStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

type UseSSEProps<T> = {
  url: string;
  onMessage?: (data: T) => void;
  enabled?: boolean;
}

export const useSSE = <T = unknown>({
  url,
  onMessage,
  enabled = true,
}: UseSSEProps<T>) => {
  const [connectionStatus, setConnectionStatus] = useState<SSEStatus>('connecting');
  const [prevKey, setPrevKey] = useState({ url, enabled });
  const onMessageRef = useRef(onMessage);

  if (prevKey.url !== url || prevKey.enabled !== enabled) {
    setPrevKey({ url, enabled });
    setConnectionStatus('connecting');
  }

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!url || !enabled) return;

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setConnectionStatus('connected');
    };

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const parsedData: T = JSON.parse(event.data);
        onMessageRef.current?.(parsedData);
      } catch (error) {
        console.error("Ошибка парсинга SSE:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Ошибка SSE соединения:", error);
      setConnectionStatus('error');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url, enabled]);

  const status: SSEStatus = !url || !enabled ? 'disconnected' : connectionStatus;

  return { status };
};