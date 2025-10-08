/**
 * Tests for gitmoji functionality
 * 
 * This module contains tests for gitmoji support, type mapping,
 * and emoji integration in commit messages.
 */

import { expect, describe, it } from 'vitest';
import { commitMessage, testData, getChoices, customOptions } from './helpers/test-helpers.js';

const { type, scope, subject, body, issues, breaking } = testData;

describe('gitmoji support', () => {
  it('should use gitmoji types when useGitmoji is true', () => {
    const options = customOptions({ useGitmoji: true });
    const choices = getChoices(options);
    
    // Should have gitmoji choices with emoji and type mapping
    expect(choices.length).to.be.greaterThan(0);
    expect(choices[0]).to.have.property('name');
    expect(choices[0]).to.have.property('value');
    expect(choices[0].name).to.contain('✨'); // Should contain emoji
  });

  it('should use conventional types when useGitmoji is false', () => {
    const options = customOptions({ useGitmoji: false });
    const choices = getChoices(options);
    
    // Should have conventional choices without emoji
    expect(choices.length).to.be.greaterThan(0);
    expect(choices[0]).to.have.property('name');
    expect(choices[0]).to.have.property('value');
    expect(choices[0].name).to.not.contain('✨'); // Should not contain emoji
  });

  it('should generate commit message with gitmoji', () => {
    const options = customOptions({ useGitmoji: true });
    expect(
      commitMessage({
        type: ':sparkles:',
        subject: 'add new feature'
      }, options)
    ).to.equal('feat: ✨ add new feature');
  });

  it('should generate commit message without gitmoji', () => {
    const options = customOptions({ useGitmoji: false });
    expect(
      commitMessage({
        type: 'feat',
        subject: 'add new feature'
      }, options)
    ).to.equal('feat: add new feature');
  });
});

describe('different gitmoji types', () => {
  it('should handle bug fix type', () => {
    expect(
      commitMessage({
        type: ':bug:',
        subject: 'fix critical bug'
      })
    ).to.equal('fix: 🐛 fix critical bug');
  });

  it('should handle documentation type', () => {
    expect(
      commitMessage({
        type: ':memo:',
        subject: 'update documentation'
      })
    ).to.equal('docs: 📝 update documentation');
  });

  it('should handle style type', () => {
    expect(
      commitMessage({
        type: ':lipstick:',
        subject: 'format code'
      })
    ).to.equal('style: 💄 format code');
  });

  it('should handle refactor type', () => {
    expect(
      commitMessage({
        type: ':recycle:',
        subject: 'refactor code structure'
      })
    ).to.equal('refactor: ♻️ refactor code structure');
  });

  it('should handle test type', () => {
    expect(
      commitMessage({
        type: ':white_check_mark:',
        subject: 'add unit tests'
      })
    ).to.equal('test: ✅ add unit tests');
  });

  it('should handle chore type', () => {
    expect(
      commitMessage({
        type: ':wrench:',
        subject: 'update dependencies'
      })
    ).to.equal('chore: 🔧 update dependencies');
  });
});

describe('gitmoji type mapping', () => {
  it('should map :sparkles: to feat', () => {
    const options = customOptions({ useGitmoji: true });
    const choices = getChoices(options);
    const sparklesChoice = choices.find(choice => choice.value === ':sparkles:');
    
    expect(sparklesChoice).to.exist;
    expect(sparklesChoice.name).to.contain('feat:');
    expect(sparklesChoice.name).to.contain('✨');
  });

  it('should map :bug: to fix', () => {
    const options = customOptions({ useGitmoji: true });
    const choices = getChoices(options);
    const bugChoice = choices.find(choice => choice.value === ':bug:');
    
    expect(bugChoice).to.exist;
    expect(bugChoice.name).to.contain('fix:');
    expect(bugChoice.name).to.contain('🐛');
  });

  it('should map :memo: to docs', () => {
    const options = customOptions({ useGitmoji: true });
    const choices = getChoices(options);
    const memoChoice = choices.find(choice => choice.value === ':memo:');
    
    expect(memoChoice).to.exist;
    expect(memoChoice.name).to.contain('docs:');
    expect(memoChoice.name).to.contain('📝');
  });
});

describe('choice formatting', () => {
  it('should format gitmoji choices with proper alignment', () => {
    const options = customOptions({ useGitmoji: true });
    const choices = getChoices(options);
    
    // All choices should have emoji, type name, and description
    choices.forEach(choice => {
      expect(choice.name).to.be.a('string');
      expect(choice.value).to.be.a('string');
      expect(choice.name).to.match(/\w+:\s+/); // Should have "type: " format
    });
  });

  it('should format conventional choices with proper alignment', () => {
    const options = customOptions({ useGitmoji: false });
    const choices = getChoices(options);
    
    // All choices should have type and description
    choices.forEach(choice => {
      expect(choice.name).to.be.a('string');
      expect(choice.value).to.be.a('string');
      expect(choice.name).to.match(/\w+:\s+/); // Should have "type: " format
    });
  });
});
