import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'online-quests-games-ideas:idea-personalization:v1';

interface IdeaPersonalizationState {
  favorites: Record<string, true>;
  notes: Record<string, string>;
}

const EMPTY_STATE: IdeaPersonalizationState = {
  favorites: {},
  notes: {},
};

let cachedRaw: string | null = null;
let cachedState: IdeaPersonalizationState = EMPTY_STATE;
const listeners = new Set<() => void>();

function normalizeState(value: unknown): IdeaPersonalizationState {
  if (!value || typeof value !== 'object') return EMPTY_STATE;

  const source = value as Partial<{
    favorites: Record<string, unknown>;
    notes: Record<string, unknown>;
  }>;
  const favorites: Record<string, true> = {};
  const notes: Record<string, string> = {};

  if (source.favorites && typeof source.favorites === 'object') {
    for (const [ideaId, isFavorite] of Object.entries(source.favorites)) {
      if (isFavorite === true) favorites[ideaId] = true;
    }
  }

  if (source.notes && typeof source.notes === 'object') {
    for (const [ideaId, note] of Object.entries(source.notes)) {
      if (typeof note === 'string' && note.trim().length > 0) {
        notes[ideaId] = note;
      }
    }
  }

  return { favorites, notes };
}

function readStoredState(): IdeaPersonalizationState {
  if (typeof window === 'undefined') return EMPTY_STATE;

  const raw = window.localStorage.getItem(STORAGE_KEY) ?? '';
  if (raw === cachedRaw) return cachedState;

  try {
    cachedState = raw ? normalizeState(JSON.parse(raw)) : EMPTY_STATE;
  } catch {
    cachedState = EMPTY_STATE;
  }
  cachedRaw = raw;
  return cachedState;
}

function emitChange() {
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  cachedRaw = null;
  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1 && typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

function writeStoredState(nextState: IdeaPersonalizationState) {
  if (typeof window === 'undefined') return;

  const normalized = normalizeState(nextState);
  const hasData =
    Object.keys(normalized.favorites).length > 0 ||
    Object.keys(normalized.notes).length > 0;

  if (hasData) {
    const raw = JSON.stringify(normalized);
    window.localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedState = normalized;
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedRaw = '';
    cachedState = EMPTY_STATE;
  }

  emitChange();
}

function updateIdeaState(
  ideaId: number,
  updater: (nextState: IdeaPersonalizationState, key: string) => void,
) {
  const current = readStoredState();
  const nextState: IdeaPersonalizationState = {
    favorites: { ...current.favorites },
    notes: { ...current.notes },
  };

  updater(nextState, String(ideaId));
  writeStoredState(nextState);
}

export function useIdeaPersonalization(ideaId: number) {
  const state = useSyncExternalStore(
    subscribe,
    readStoredState,
    () => EMPTY_STATE,
  );
  const key = String(ideaId);
  const note = state.notes[key] ?? '';
  const isFavorite = state.favorites[key] === true;

  const toggleFavorite = useCallback(() => {
    updateIdeaState(ideaId, (nextState, ideaKey) => {
      if (nextState.favorites[ideaKey]) {
        delete nextState.favorites[ideaKey];
      } else {
        nextState.favorites[ideaKey] = true;
      }
    });
  }, [ideaId]);

  const setNote = useCallback((value: string) => {
    updateIdeaState(ideaId, (nextState, ideaKey) => {
      if (value.trim().length > 0) {
        nextState.notes[ideaKey] = value;
      } else {
        delete nextState.notes[ideaKey];
      }
    });
  }, [ideaId]);

  const clearNote = useCallback(() => {
    updateIdeaState(ideaId, (nextState, ideaKey) => {
      delete nextState.notes[ideaKey];
    });
  }, [ideaId]);

  return {
    clearNote,
    hasNote: note.trim().length > 0,
    isFavorite,
    note,
    setNote,
    toggleFavorite,
  };
}
