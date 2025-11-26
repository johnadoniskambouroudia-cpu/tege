export interface TelegramGroup {
  name: string;
  description: string;
  category: string;
  membersCount: string;
  language: string;
  link: string; // Typically t.me/username
  isOfficial?: boolean;
}

export interface SearchState {
  query: string;
  loading: boolean;
  results: TelegramGroup[];
  error: string | null;
  hasSearched: boolean;
}

export enum SortOption {
  RELEVANCE = 'relevance',
  MEMBERS = 'members',
}