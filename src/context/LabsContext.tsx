/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Labs Context & State Manager
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Writeup, CategoryInfo, DifficultyLevel, PlatformType, CategorySlug } from '../types.ts';
import { INITIAL_WRITEUPS } from '../data/writeups.ts';
import { CATEGORIES } from '../data/categories.ts';

interface FilterState {
  searchQuery: string;
  platform: PlatformType | 'All';
  difficulty: DifficultyLevel | 'All';
  category: CategorySlug | 'All';
  sortBy: 'date-desc' | 'date-asc' | 'difficulty-desc' | 'read-time';
}

interface LabsContextType {
  writeups: Writeup[];
  categories: CategoryInfo[];
  bookmarks: string[]; // writeup IDs
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addWriteup: (newWriteup: Writeup) => void;
  updateWriteup: (updatedWriteup: Writeup) => void;
  deleteWriteup: (id: string) => void;
  resetToDefaults: () => void;
  exportDataAsJson: () => string;
  importDataFromJson: (jsonData: string) => boolean;
  currentRoute: string;
  navigate: (route: string) => void;
}

const STORAGE_WRITEUPS_KEY = '8whie_writeups_v1';
const STORAGE_BOOKMARKS_KEY = '8whie_bookmarks_v1';

const defaultFilters: FilterState = {
  searchQuery: '',
  platform: 'All',
  difficulty: 'All',
  category: 'All',
  sortBy: 'date-desc',
};

const LabsContext = createContext<LabsContextType | undefined>(undefined);

export const LabsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load writeups from localStorage or fall back to INITIAL_WRITEUPS
  const [writeups, setWriteups] = useState<Writeup[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WRITEUPS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_WRITEUPS;
  });

  const [categories] = useState<CategoryInfo[]>(CATEGORIES);

  // Load bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Simple, rock-solid hash router
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentRoute(hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    const clean = route.startsWith('/') ? route : `/${route}`;
    window.location.hash = clean;
  };

  // Save writeups to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WRITEUPS_KEY, JSON.stringify(writeups));
    } catch {
      // handle quota
    }
  }, [writeups]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch {
      // handle quota
    }
  }, [bookmarks]);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const addWriteup = (newWriteup: Writeup) => {
    setWriteups((prev) => [newWriteup, ...prev]);
  };

  const updateWriteup = (updated: Writeup) => {
    setWriteups((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  const deleteWriteup = (id: string) => {
    setWriteups((prev) => prev.filter((w) => w.id !== id));
    setBookmarks((prev) => prev.filter((bId) => bId !== id));
  };

  const resetToDefaults = () => {
    setWriteups(INITIAL_WRITEUPS);
    try {
      localStorage.setItem(STORAGE_WRITEUPS_KEY, JSON.stringify(INITIAL_WRITEUPS));
    } catch {
      // ignore
    }
  };

  const exportDataAsJson = (): string => {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        author: 'Aryan Thakur',
        platform: '8WHIE Cyber Security Labs',
        copyright: '© 2026 8WHIE',
        writeups,
      },
      null,
      2
    );
  };

  const importDataFromJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      const incomingList = Array.isArray(parsed) ? parsed : parsed.writeups;
      if (Array.isArray(incomingList) && incomingList.length > 0) {
        setWriteups(incomingList);
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON data', e);
    }
    return false;
  };

  return (
    <LabsContext.Provider
      value={{
        writeups,
        categories,
        bookmarks,
        filters,
        setFilters,
        resetFilters,
        toggleBookmark,
        isBookmarked,
        addWriteup,
        updateWriteup,
        deleteWriteup,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
        currentRoute,
        navigate,
      }}
    >
      {children}
    </LabsContext.Provider>
  );
};

export const useLabs = () => {
  const context = useContext(LabsContext);
  if (!context) {
    throw new Error('useLabs must be used within a LabsProvider');
  }
  return context;
};
