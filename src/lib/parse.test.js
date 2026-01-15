import assert from 'node:assert';
import { describe, it } from 'node:test';
import { parseQuestions } from './parse.js';

describe('parse', () => {
  describe('parseQuestions', () => {
    it('should test', () => {
      const result = parseQuestions();
      assert.strictEqual(result, 'test');
    });
  });
});
