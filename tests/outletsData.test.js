/**
 * tests/outletsData.test.js
 *
 * Validates the structural integrity of the outletsData array.
 * These tests enforce the data contract that pages depend on —
 * if a field name changes or a value is out of range, these tests fail early.
 */
import { describe, it, expect } from 'vitest';
import { outletsData } from '../src/data/outlets.js';

describe('outletsData', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(outletsData)).toBe(true);
    expect(outletsData.length).toBeGreaterThan(0);
  });

  describe('each outlet', () => {
    outletsData.forEach((outlet) => {
      describe(`outlet "${outlet.id}"`, () => {
        // --- Identity & required string fields ---
        it('has a non-empty string id', () => {
          expect(typeof outlet.id).toBe('string');
          expect(outlet.id.trim().length).toBeGreaterThan(0);
        });

        it('has a non-empty title', () => {
          expect(typeof outlet.title).toBe('string');
          expect(outlet.title.trim().length).toBeGreaterThan(0);
        });

        it('has a non-empty highway field', () => {
          expect(typeof outlet.highway).toBe('string');
          expect(outlet.highway.trim().length).toBeGreaterThan(0);
        });

        it('has a non-empty fullAddress', () => {
          expect(typeof outlet.fullAddress).toBe('string');
          expect(outlet.fullAddress.trim().length).toBeGreaterThan(0);
        });

        // --- Operational status ---
        it('has a boolean isOperational flag', () => {
          expect(typeof outlet.isOperational).toBe('boolean');
        });

        // --- Coordinates ---
        it('has coordinates within valid lat/lng ranges', () => {
          expect(typeof outlet.coordinates).toBe('object');
          expect(outlet.coordinates.lat).toBeGreaterThanOrEqual(-90);
          expect(outlet.coordinates.lat).toBeLessThanOrEqual(90);
          expect(outlet.coordinates.lng).toBeGreaterThanOrEqual(-180);
          expect(outlet.coordinates.lng).toBeLessThanOrEqual(180);
        });

        it('has coordinates plausibly within India (lat 6–38, lng 68–98)', () => {
          expect(outlet.coordinates.lat).toBeGreaterThan(6);
          expect(outlet.coordinates.lat).toBeLessThan(38);
          expect(outlet.coordinates.lng).toBeGreaterThan(68);
          expect(outlet.coordinates.lng).toBeLessThan(98);
        });

        it('has a valid googleMapsUrl', () => {
          expect(typeof outlet.googleMapsUrl).toBe('string');
          expect(outlet.googleMapsUrl).toMatch(/^https?:\/\//);
        });

        // --- Charging specs ---
        it('has specs with a positive chargersCount', () => {
          expect(typeof outlet.specs).toBe('object');
          expect(outlet.specs.chargersCount).toBeGreaterThan(0);
        });

        it('has specs with positive totalChargingPoints', () => {
          expect(outlet.specs.totalChargingPoints).toBeGreaterThan(0);
        });

        it('has specs with a non-empty connectorType', () => {
          expect(typeof outlet.specs.connectorType).toBe('string');
          expect(outlet.specs.connectorType.trim().length).toBeGreaterThan(0);
        });

        it('has specs with a non-empty tariff', () => {
          expect(typeof outlet.specs.tariff).toBe('string');
          expect(outlet.specs.tariff.trim().length).toBeGreaterThan(0);
        });

        it('has specs with a non-empty operatingHours', () => {
          expect(typeof outlet.specs.operatingHours).toBe('string');
          expect(outlet.specs.operatingHours.trim().length).toBeGreaterThan(0);
        });

        // --- Amenities ---
        it('has an amenities array with at least one entry', () => {
          expect(Array.isArray(outlet.amenities)).toBe(true);
          expect(outlet.amenities.length).toBeGreaterThan(0);
        });

        it('has amenity items with id and name strings', () => {
          outlet.amenities.forEach((amenity) => {
            expect(typeof amenity.id).toBe('string');
            expect(amenity.id.trim().length).toBeGreaterThan(0);
            expect(typeof amenity.name).toBe('string');
            expect(amenity.name.trim().length).toBeGreaterThan(0);
          });
        });

        // --- Contacts ---
        it('has contacts with a primaryPhone string', () => {
          expect(typeof outlet.contacts).toBe('object');
          expect(typeof outlet.contacts.primaryPhone).toBe('string');
          expect(outlet.contacts.primaryPhone.trim().length).toBeGreaterThan(0);
        });

        it('has contacts with a whatsappNumber containing only digits after sanitization', () => {
          const digitsOnly = outlet.contacts.whatsappNumber.replace(/[^0-9]/g, '');
          expect(digitsOnly.length).toBeGreaterThanOrEqual(10);
        });

        // --- Images ---
        it('has image paths that start with a forward slash', () => {
          expect(typeof outlet.images).toBe('object');
          expect(outlet.images.hero).toMatch(/^\//);
          expect(outlet.images.chargerUnit).toMatch(/^\//);
        });
      });
    });
  });
});
