export type WikiChange = {
  wiki: string;
  title: string;
  user: string;
  type?: string;
  timestamp?: number;
  meta?: { id: string };
}