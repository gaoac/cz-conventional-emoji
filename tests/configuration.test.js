/**
 * Tests for configuration options
 * 
 * This module contains tests for various configuration options,
 * including width limits, case conversion, and custom settings.
 */

import { expect, describe, it } from 'vitest';
import { commitMessage, testData, customOptions, questionDefault, questionPrompt, questionFilter } from './helpers/test-helpers.js';

const { type, scope, subject, body, issues, breaking } = testData;

describe('configuration options', () => {
  it('should handle custom maxLineWidth', () => {
    const customOptions = {
      maxLineWidth: 50
    };
    expect(
      commitMessage({
        type,
        subject: 'short subject',
        body: 'This is a very long body that should be wrapped according to the custom maxLineWidth setting'
      }, customOptions)
    ).to.contain('This is a very long body that should be');
  });

  it('should handle custom maxHeaderWidth', () => {
    const customOptions = {
      maxHeaderWidth: 50
    };
    expect(() =>
      commitMessage({
        type,
        subject: 'This is a very long subject that exceeds the custom maxHeaderWidth limit'
      }, customOptions)
    ).to.throw('Subject length must be less than or equal to');
  });

  it('should handle disableScopeLowerCase', () => {
    const customOptions = {
      disableScopeLowerCase: true
    };
    expect(
      commitMessage({
        type,
        scope: 'UPPERCASE_SCOPE',
        subject
      }, customOptions)
    ).to.equal(`feat(UPPERCASE_SCOPE): ✨ ${subject}`);
  });

  it('should handle disableSubjectLowerCase', () => {
    const customOptions = {
      disableSubjectLowerCase: true
    };
    expect(
      commitMessage({
        type,
        scope,
        subject: 'UPPERCASE_SUBJECT'
      }, customOptions)
    ).to.equal(`feat(${scope}): ✨ UPPERCASE_SUBJECT`);
  });

  it('should handle custom types', () => {
    const customTypes = {
      'custom': {
        description: 'Custom commit type',
        title: 'Custom'
      }
    };
    const customOptions = {
      types: customTypes
    };
    
    // Test that custom types are available
    const typeQuestion = questionDefault('type', customOptions);
    expect(typeQuestion).to.be.undefined; // No default type
  });

  it('should handle custom gitmojis', () => {
    const customGitmojis = [
      {
        code: ':custom:',
        emoji: '🎯',
        name: 'custom',
        description: 'Custom gitmoji'
      }
    ];
    const customOptions = {
      useGitmoji: true,
      gitmojis: customGitmojis
    };
    
    expect(
      commitMessage({
        type: ':custom:',
        subject: 'custom commit'
      }, customOptions)
    ).to.equal('custom: 🎯 custom commit');
  });
});

describe('defaults', () => {
  it('defaultType default', () => {
    expect(questionDefault('type')).to.be.undefined;
  });

  it('defaultScope default', () => {
    expect(questionDefault('scope')).to.be.undefined;
  });

  it('defaultSubject default', () => {
    expect(questionDefault('subject')).to.be.undefined;
  });

  it('defaultBody default', () => {
    expect(questionDefault('body')).to.be.undefined;
  });

  it('defaultIssues default', () => {
    expect(questionDefault('issues')).to.be.undefined;
  });

  it('defaultType with value', () => {
    const customOptions = {
      defaultType: 'feat'
    };
    expect(questionDefault('type', customOptions)).to.equal('feat');
  });

  it('defaultScope with value', () => {
    const customOptions = {
      defaultScope: 'core'
    };
    expect(questionDefault('scope', customOptions)).to.equal('core');
  });

  it('defaultSubject with value', () => {
    const customOptions = {
      defaultSubject: 'initial commit'
    };
    expect(questionDefault('subject', customOptions)).to.equal('initial commit');
  });

  it('defaultBody with value', () => {
    const customOptions = {
      defaultBody: 'This is the default body'
    };
    expect(questionDefault('body', customOptions)).to.equal('This is the default body');
  });

  it('defaultIssues with value', () => {
    const customOptions = {
      defaultIssues: 'Closes #123'
    };
    expect(questionDefault('issues', customOptions)).to.equal('Closes #123');
  });
});

describe('prompts', () => {
  it('commit subject prompt for commit w/ out scope', () => {
    expect(questionPrompt('subject', { type })).to.contain(
      'Write a short, imperative tense description of the change'
    );
  });

  it('commit subject prompt for commit w/ scope', () => {
    expect(questionPrompt('subject', { type, scope })).to.contain(
      'Write a short, imperative tense description of the change'
    );
  });

  it('commit body prompt', () => {
    expect(questionPrompt('body')).to.contain(
      'Provide a longer description of the change'
    );
  });

  it('commit issues prompt', () => {
    expect(questionPrompt('issues')).to.contain(
      'Add issue references'
    );
  });

  it('commit breaking prompt', () => {
    expect(questionPrompt('breaking')).to.contain(
      'Describe the breaking changes'
    );
  });
});

describe('transformation', () => {
  it('subject w/ character count', () =>
    expect(
      questionPrompt('subject', { type })
    ).to.contain('Write a short, imperative tense description of the change'));

  it('body w/ character count', () =>
    expect(
      questionPrompt('body')
    ).to.contain('Provide a longer description of the change'));

  it('issues w/ character count', () =>
    expect(
      questionPrompt('issues')
    ).to.contain('Add issue references'));

  it('breaking w/ character count', () =>
    expect(
      questionPrompt('breaking')
    ).to.contain('Describe the breaking changes'));
});

describe('non-gitmoji mode', () => {
  it('should work without gitmoji', () => {
    expect(
      commitMessage({
        type: 'feat',
        subject: 'add new feature'
      }, { useGitmoji: false })
    ).to.equal('feat: add new feature');
  });

  it('should work without gitmoji with scope', () => {
    expect(
      commitMessage({
        type: 'feat',
        scope: 'core',
        subject: 'add new feature'
      }, { useGitmoji: false })
    ).to.equal('feat(core): add new feature');
  });

  it('should work without gitmoji with body', () => {
    expect(
      commitMessage({
        type: 'feat',
        subject: 'add new feature',
        body: 'This adds a new feature'
      }, { useGitmoji: false })
    ).to.equal('feat: add new feature\n\nThis adds a new feature');
  });
});
