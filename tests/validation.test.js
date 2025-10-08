/**
 * Tests for validation functionality
 * 
 * This module contains tests for input validation, length constraints,
 * and error handling in the commit message generation process.
 */

import { expect, describe, it } from 'vitest';
import { commitMessage, testData, questionFilter, questionWhen } from './helpers/test-helpers.js';

const { type, scope, subject, body, issues, breaking } = testData;

describe('validation', () => {
  it('subject exceeds max length', () => {
    expect(() =>
      commitMessage({
        type,
        subject: 'a'.repeat(100)
      })
    ).to.throw('Subject length must be less than or equal to');
  });

  it('subject exceeds max length with scope', () => {
    expect(() =>
      commitMessage({
        type,
        scope,
        subject: 'a'.repeat(100)
      })
    ).to.throw('Subject length must be less than or equal to');
  });

  it('subject exceeds max length with scope and body', () => {
    expect(() =>
      commitMessage({
        type,
        scope,
        subject: 'a'.repeat(100),
        body
      })
    ).to.throw('Subject length must be less than or equal to');
  });
});

describe('filter', () => {
  it('lowercase scope', () => {
    const filter = questionFilter('scope');
    expect(filter('HelloMatt')).to.equal('hellomatt');
  });

  it('lowercase subject', () => {
    const filter = questionFilter('subject');
    expect(filter('  A subject...  ')).to.equal('a subject');
  });

  it('trim subject', () => {
    const filter = questionFilter('subject');
    expect(filter('  my subject  ')).to.equal('my subject');
  });

  it('trim scope', () => {
    const filter = questionFilter('scope');
    expect(filter('  my scope  ')).to.equal('my scope');
  });
});

describe('when', () => {
  it('breaking by default', () =>
    expect(questionWhen('breaking', {})).to.be.undefined);

  it('breaking when isBreaking is true', () =>
    expect(questionWhen('breaking', { isBreaking: true })).to.be.true);

  it('breaking when isBreaking is false', () =>
    expect(questionWhen('breaking', { isBreaking: false })).to.be.false);

  it('breaking when isBreaking is undefined', () =>
    expect(questionWhen('breaking', { isBreaking: undefined })).to.be.undefined);

});

describe('validation edge cases', () => {
  it('should calculate correct max subject length with scope', () => {
    const options = { maxHeaderWidth: 100 };
    // type (4) + ': ' (2) + '(scope): ' (10) + emoji (2) + space (1) = 19
    // So max subject length = 100 - 19 = 81 for gitmoji mode with scope
    expect(() =>
      commitMessage({
        type: ':sparkles:',
        scope: 'scope',
        subject: 'a'.repeat(100)
      }, options)
    ).to.throw('Subject length must be less than or equal to');
  });

  it('should calculate correct max subject length without scope', () => {
    const options = { maxHeaderWidth: 100 };
    // type (4) + ': ' (2) + emoji (2) + space (1) = 9
    // So max subject length = 100 - 9 = 91 for gitmoji mode without scope
    expect(() =>
      commitMessage({
        type: ':sparkles:',
        subject: 'a'.repeat(100)
      }, options)
    ).to.throw('Subject length must be less than or equal to');
  });
});
