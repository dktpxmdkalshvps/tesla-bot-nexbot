import { describe, it, expect } from 'vitest';
import { FINISHES, TASK_MODULES, UPGRADES, TECH_SPECS } from './data';

describe('Data Exports (data.ts)', () => {
  describe('FINISHES', () => {
    it('contains a non-empty list of finishes', () => {
      expect(FINISHES.length).toBeGreaterThan(0);
    });

    it('has unique IDs for each finish', () => {
      const ids = FINISHES.map((finish) => finish.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has valid structure and hex colors for every finish', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

      FINISHES.forEach((finish) => {
        expect(finish.id).toBeTruthy();
        expect(finish.name).toBeTruthy();
        expect(finish.description).toBeTruthy();
        expect(finish.imageAlt).toBeTruthy();
        expect(finish.price).toBeGreaterThanOrEqual(0);
        expect(finish.colorHex).toMatch(hexColorRegex);
        expect(finish.accentHex).toMatch(hexColorRegex);
      });
    });
  });

  describe('TASK_MODULES', () => {
    it('contains a non-empty list of task modules', () => {
      expect(TASK_MODULES.length).toBeGreaterThan(0);
    });

    it('has unique IDs for each task module', () => {
      const ids = TASK_MODULES.map((module) => module.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has valid structure and non-empty features for every module', () => {
      TASK_MODULES.forEach((module) => {
        expect(module.id).toBeTruthy();
        expect(module.name).toBeTruthy();
        expect(module.description).toBeTruthy();
        expect(module.icon).toBeTruthy();
        expect(module.price).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(module.features)).toBe(true);
        expect(module.features.length).toBeGreaterThan(0);
        module.features.forEach((feature) => {
          expect(feature.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('UPGRADES', () => {
    it('contains a non-empty list of upgrades', () => {
      expect(UPGRADES.length).toBeGreaterThan(0);
    });

    it('has unique IDs for each upgrade', () => {
      const ids = UPGRADES.map((upgrade) => upgrade.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has valid structure and positive price for every upgrade', () => {
      UPGRADES.forEach((upgrade) => {
        expect(upgrade.id).toBeTruthy();
        expect(upgrade.name).toBeTruthy();
        expect(upgrade.description).toBeTruthy();
        expect(upgrade.price).toBeGreaterThan(0);
      });
    });
  });

  describe('TECH_SPECS', () => {
    it('contains a non-empty list of tech spec categories', () => {
      expect(TECH_SPECS.length).toBeGreaterThan(0);
    });

    it('has valid structure and items for every category', () => {
      TECH_SPECS.forEach((group) => {
        expect(group.category).toBeTruthy();
        expect(Array.isArray(group.items)).toBe(true);
        expect(group.items.length).toBeGreaterThan(0);

        group.items.forEach((item) => {
          expect(item.label).toBeTruthy();
          expect(item.value).toBeTruthy();
          expect(item.details).toBeTruthy();
        });
      });
    });
  });
});
