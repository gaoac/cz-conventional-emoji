/**
 * Tests for edge cases and error handling
 * 
 * This module contains tests for edge cases, error scenarios,
 * and boundary conditions in the commit message generation.
 */

import { expect, describe, it } from 'vitest';
import { commitMessage, testData, questionPrompt } from './helpers/test-helpers.js';

const { type, scope, subject } = testData;

describe('edge cases and error handling', () => {
  it('should handle empty scope', () => {
    expect(
      commitMessage({
        type,
        scope: '',
        subject
      })
    ).to.equal(`feat: ✨ ${subject}`);
  });

  it('should handle null scope', () => {
    expect(
      commitMessage({
        type,
        scope: null,
        subject
      })
    ).to.equal(`feat: ✨ ${subject}`);
  });

  it('should handle undefined scope', () => {
    expect(
      commitMessage({
        type,
        scope: undefined,
        subject
      })
    ).to.equal(`feat: ✨ ${subject}`);
  });

  it('should handle empty subject', () => {
    expect(() => {
      commitMessage({
        type,
        subject: ''
      });
    }).to.throw('subject is required');
  });
});

describe('prompt message variations', () => {
  it('should show correct subject prompt with type', () => {
    const prompt = questionPrompt('subject', { type: ':sparkles:' });
    expect(prompt).to.be.a('string');
    expect(prompt).to.include('Write a short');
  });

  it('should show correct subject prompt with scope', () => {
    const prompt = questionPrompt('subject', { type: ':sparkles:', scope: 'api' });
    expect(prompt).to.be.a('string');
    expect(prompt).to.include('Write a short');
  });

  it('should show correct body prompt', () => {
    const prompt = questionPrompt('body');
    expect(prompt).to.contain('Provide a longer description of the change');
  });

  it('should show correct issues prompt', () => {
    const prompt = questionPrompt('issues');
    expect(prompt).to.contain('Add issue references');
  });

  it('should show correct breaking prompt', () => {
    const prompt = questionPrompt('breaking');
    expect(prompt).to.contain('Describe the breaking changes');
  });
});