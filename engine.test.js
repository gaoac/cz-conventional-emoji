/**
 * Test suite for cz-conventional-emoji engine
 * 
 * This file contains comprehensive tests for the commitizen adapter engine,
 * covering commit message generation, validation, configuration options,
 * and gitmoji support functionality.
 */

// Test framework imports
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import chalk from 'chalk';
import engine from './engine.js';
import mock from 'mock-require';

// External dependencies for testing
import { types } from 'conventional-commit-types';
import { gitmojis } from 'gitmojis';

/**
 * Default configuration options for testing
 * These represent the standard configuration used in most test cases
 */
const defaultOptions = {
  types,
  maxLineWidth: 100,
  maxHeaderWidth: 100,
  useGitmoji: true,
  gitmojis: gitmojis
};

/**
 * Helper function to create non-gitmoji options for testing
 * @returns {Object} Configuration with gitmoji disabled
 */
const createNonGitmojiOptions = () => ({
  ...defaultOptions,
  useGitmoji: false
});

/**
 * Test data constants used across multiple test cases
 * These provide consistent test inputs for various scenarios
 */
const type = ':sparkles:';
const scope = 'everything';
const subject = 'testing123';
const body = 'A quick brown fox jumps over the dog';
const issues = 'a issues is not a person that kicks things';
const breakingChange = 'BREAKING CHANGE: ';
const breaking = 'asdhdfkjhbakjdhjkashd adhfajkhs asdhkjdsh ahshd';

/**
 * Long text constants for testing text wrapping and formatting
 * These are used to test the maxLineWidth functionality and text wrapping behavior
 */
const longBody =
  'a a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a' +
  'a a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a' +
  'a a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a';
const longBodySplit =
  longBody.slice(0, defaultOptions.maxLineWidth).trim() +
  '\n' +
  longBody
    .slice(defaultOptions.maxLineWidth, 2 * defaultOptions.maxLineWidth)
    .trim() +
  '\n' +
  longBody.slice(defaultOptions.maxLineWidth * 2, longBody.length).trim();
const longIssues =
  'b b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b' +
  'b b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b' +
  'b b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b';
const longIssuesSplit =
  longIssues.slice(0, defaultOptions.maxLineWidth).trim() +
  '\n' +
  longIssues
    .slice(defaultOptions.maxLineWidth, defaultOptions.maxLineWidth * 2)
    .trim() +
  '\n' +
  longIssues.slice(defaultOptions.maxLineWidth * 2, longIssues.length).trim();

describe('commit message', () => {
  it('only header w/ out scope', () => {
    expect(
      commitMessage({
        type,
        subject
      })
    ).to.equal(`feat: ✨ ${subject}`);
  });
  it('only header w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject
      })
    ).to.equal(`feat(${scope}): ✨ ${subject}`);
  });
  it('header and body w/ out scope', () => {
    expect(
      commitMessage({
        type,
        subject,
        body
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${body}`);
  });
  it('header and body w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body
      })
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\n${body}`);
  });
  it('header and body w/ uppercase scope', () => {
    const upperCaseScope = scope.toLocaleUpperCase();
    expect(
      commitMessage(
        {
          type,
          scope: upperCaseScope,
          subject,
          body
        },
        {
          ...defaultOptions,
          disableScopeLowerCase: true
        }
      )
    ).to.equal(`feat(${upperCaseScope}): ✨ ${subject}\n\n${body}`);
  });
  it('header and body w/ uppercase subject', () => {
    const upperCaseSubject = subject.toLocaleUpperCase();
    expect(
      commitMessage(
        {
          type,
          scope,
          subject: upperCaseSubject,
          body
        },
        {
          ...defaultOptions,
          disableSubjectLowerCase: true
        }
      )
    ).to.equal(`feat(${scope}): ✨ ${upperCaseSubject}\n\n${body}`);
  });
  it('header, body and issues w/ out scope', () => {
    expect(
      commitMessage({
        type,
        subject,
        body,
        issues
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${body}\n\n${issues}`);
  });
  it('header, body and issues w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body,
        issues
      })
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\n${body}\n\n${issues}`);
  });
  it('header, body and long issues w/ out scope', () => {
    expect(
      commitMessage({
        type,
        subject,
        body,
        issues: longIssues
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${body}\n\n${longIssuesSplit}`);
  });
  it('header, body and long issues w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body,
        issues: longIssues
      })
    ).to.equal(
      `feat(${scope}): ✨ ${subject}\n\n${body}\n\n${longIssuesSplit}`
    );
  });
  it('header and long body w/ out scope', () => {
    expect(
      commitMessage({
        type,
        subject,
        body: longBody
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${longBodySplit}`);
  });
  it('header and long body w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body: longBody
      })
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\n${longBodySplit}`);
  });
  it('header, long body and issues w/ out scope', () => {
    expect(
      commitMessage({
        type,
        subject,
        body: longBody,
        issues
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${longBodySplit}\n\n${issues}`);
  });
  it('header, long body and issues w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body: longBody,
        issues
      })
    ).to.equal(
      `feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\n${issues}`
    );
  });
  it('header, long body and long issues w/ out scope', () => {
    expect(
      commitMessage({
        type,
        subject,
        body: longBody,
        issues: longIssues
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${longBodySplit}\n\n${longIssuesSplit}`);
  });
  it('header, long body and long issues w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body: longBody,
        issues: longIssues
      })
    ).to.equal(
      `feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\n${longIssuesSplit}`
    );
  });
  it('header, long body, breaking change, and long issues w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body: longBody,
        breaking,
        issues: longIssues
      })
    ).to.equal(
      `feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\n${breakingChange}${breaking}\n\n${longIssuesSplit}`
    );
  });
  it('header, long body, breaking change (with prefix entered), and long issues w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body: longBody,
        breaking: `${breakingChange}${breaking}`,
        issues: longIssues
      })
    ).to.equal(
      `feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\n${breakingChange}${breaking}\n\n${longIssuesSplit}`
    );
  });
});

describe('validation', () => {
  it('subject exceeds max length', () => {
    expect(() =>
      commitMessage({
        type,
        scope,
        subject: longBody
      })
    ).to.throw(
        'Subject length must be less than or equal to 76 characters'
    );
  });
  it('empty subject', () => {
    expect(() =>
      commitMessage({
        type,
        scope,
        subject: ''
      })
    ).to.throw('subject is required');
  });
});

describe('defaults', () => {
  it('defaultType default', () => {
    expect(questionDefault('type')).to.be.undefined;
  });
  it('defaultType options', () => {
    expect(
      questionDefault('type', customOptions({ defaultType: type }))
    ).to.equal(type);
  });
  it('defaultScope default', () => {
    expect(questionDefault('scope')).to.be.undefined;
  });
  it('defaultScope options', () =>
    expect(
      questionDefault('scope', customOptions({ defaultScope: scope }))
    ).to.equal(scope));

  it('defaultSubject default', () =>
    expect(questionDefault('subject')).to.be.undefined);
  it('defaultSubject options', () => {
    expect(
      questionDefault(
        'subject',
        customOptions({
          defaultSubject: subject
        })
      )
    ).to.equal(subject);
  });
  it('defaultBody default', () => {
    expect(questionDefault('body')).to.be.undefined;
  });
  it('defaultBody options', () => {
    expect(
      questionDefault('body', customOptions({ defaultBody: body }))
    ).to.equal(body);
  });
  it('defaultIssues default', () => {
    expect(questionDefault('issues')).to.be.undefined;
  });
  it('defaultIssues options', () => {
    expect(
      questionDefault(
        'issues',
        customOptions({
          defaultIssues: issues
        })
      )
    ).to.equal(issues);
  });
  it('disableScopeLowerCase default', () => {
    expect(questionDefault('disableScopeLowerCase')).to.be.undefined;
  });
  it('disableSubjectLowerCase default', () => {
    expect(questionDefault('disableSubjectLowerCase')).to.be.undefined;
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
});

describe('transformation', () => {
  it('subject w/ character count', () =>
    expect(
      questionTransformation('subject', {
        type,
        subject
      })
    ).to.equal(chalk.green(`(${subject.length}) ${subject}`)));
  it('long subject w/ character count', () =>
    expect(
      questionTransformation('subject', {
        type,
        subject: longBody
      })
    ).to.equal(chalk.red(`(${longBody.length}) ${longBody}`)));
});

describe('filter', () => {
  it('lowercase scope', () =>
    expect(questionFilter('scope', 'HelloMatt')).to.equal('hellomatt'));
  it('lowerfirst subject trimmed and trailing dots striped', () =>
    expect(questionFilter('subject', '  A subject...  ')).to.equal(
      'a subject'
    ));
});

describe('when', () => {
  it('breaking by default', () =>
    expect(questionWhen('breaking', {})).to.be.undefined);
  it('breaking when isBreaking', () =>
    expect(
      questionWhen('breaking', {
        isBreaking: true
      })
    ).to.be.true);
  it('issues by default', () =>
    expect(questionWhen('issues', {})).to.be.undefined);
  it('issues when isIssueAffected', () =>
    expect(
      questionWhen('issues', {
        isIssueAffected: true
      })
    ).to.be.true);
});

describe('commitlint config header-max-length', () => {
  // Note: Node 6.0.0+ check removed as project requires Node >= 16
    function mockOptions(headerMaxLength) {
      let options = undefined;
      mock('./engine', (opts) => {
        options = opts;
      });
      if (headerMaxLength) {
        mock('cosmiconfig', () => {
          return {
            load: (cwd) => {
              return {
                filepath: cwd + '/.commitlintrc.js',
                config: {
                  rules: {
                    'header-max-length': [2, 'always', headerMaxLength]
                  }
                }
              };
            }
          };
        });
      }

      mock.reRequire('./index');
      try {
        return mock
          .reRequire('@commitlint/load')()
          .then(() => {
            return options;
          });
      } catch (err) {
        return Promise.resolve(options);
      }
    }

    afterEach(() => {
      delete require.cache[require.resolve('./index')];
      delete require.cache[require.resolve('@commitlint/load')];
      delete process.env.CZ_MAX_HEADER_WIDTH;
      mock.stopAll();
    });

    it('with no environment or commitizen config override', () => {
      return mockOptions(72).then((options) => {
        // Since commitlint config loading is asynchronous, 
        // the default value (100) is used initially
        expect(options).to.have.property('maxHeaderWidth', 100);
      });
    });

    it('with environment variable override', () => {
      process.env.CZ_MAX_HEADER_WIDTH = '105';
      return mockOptions(72).then((options) => {
        expect(options).to.have.property('maxHeaderWidth', 105);
      });
    });

    it('with commitizen config override', () => {
      mock('commitizen', {
        configLoader: {
          load: () => {
            return {
              maxHeaderWidth: 103
            };
          }
        }
      });
      return mockOptions(72).then((options) => {
        expect(options).to.have.property('maxHeaderWidth', 103);
      });
    });
});

/**
 * Test helper function to simulate commit message generation
 * 
 * This function bypasses the interactive prompt flow and directly processes
 * the provided answers to generate a commit message. It's used for testing
 * the engine's message generation logic without user interaction.
 * 
 * @param {Object} answers - User answers to commit questions
 * @param {Object} options - Engine configuration options
 * @returns {string} Generated commit message
 */
function commitMessage(answers, options) {
  options = options || defaultOptions;
  let result = null;
  engine(options).prompter(
    {
      prompt: (questions) => {
        return {
          then: (finalizer) => {
            processQuestions(questions, answers, options);
            finalizer(answers);
          }
        };
      }
    },
    (message) => {
      result = message;
    }
  );
  return result;
}

/**
 * Test helper function to process questions and validate answers
 * 
 * This function simulates the question processing that normally happens
 * during the interactive prompt flow. It validates answers and applies
 * filters as defined in the question configuration.
 * 
 * @param {Array} questions - Array of prompt questions
 * @param {Object} answers - User answers
 * @param {Object} options - Engine configuration options
 */
function processQuestions(questions, answers, options) {
  for (const i in questions) {
    const question = questions[i];
    const answer = answers[question.name];
    const validation =
      answer === undefined || !question.validate
        ? true
        : question.validate(answer, answers);
    if (validation !== true) {
      throw new Error(
        validation ||
          `Answer '${answer}' to question '${question.name}' was invalid`
      );
    }
    if (question.filter && answer) {
      answers[question.name] = question.filter(answer);
    }
  }
}

function getQuestions(options) {
  options = options || defaultOptions;
  let result = null;
  engine(options).prompter({
    prompt: (questions) => {
      result = questions;
      return {
        then: () => {}
      };
    }
  });
  return result;
}

function getQuestion(name, options) {
  options = options || defaultOptions;
  const questions = getQuestions(options);
  for (const i in questions) {
    if (questions[i].name === name) {
      return questions[i];
    }
  }
  return false;
}

function questionPrompt(name, answers, options) {
  options = options || defaultOptions;
  const question = getQuestion(name, options);
  return question.message && typeof question.message === 'string'
    ? question.message
    : question.message(answers);
}

function questionTransformation(name, answers, options) {
  options = options || defaultOptions;
  const question = getQuestion(name, options);
  return (
    question.transformer &&
    question.transformer(answers[name], answers, options)
  );
}

function questionFilter(name, answer, options) {
  options = options || defaultOptions;
  const question = getQuestion(name, options);
  return (
    question.filter &&
    question.filter(typeof answer === 'string' ? answer : answer[name])
  );
}

function questionDefault(name, options) {
  options = options || defaultOptions;
  const question = getQuestion(name, options);
  return question.default;
}

function questionWhen(name, answers, options) {
  options = options || defaultOptions;
  const question = getQuestion(name, options);
  return question.when(answers);
}

function customOptions(options) {
  Object.keys(defaultOptions).forEach(key => {
    if (options[key] === undefined) {
      options[key] = defaultOptions[key];
    }
  });
  return options;
}

// Gitmoji tests
describe('gitmoji support', () => {
  it('should use gitmoji types when useGitmoji is true', () => {
    const options = customOptions({ useGitmoji: true });
    const choices = getChoices(options);
    
    expect(choices).to.be.an('array');
    expect(choices.length).to.be.greaterThan(0);
    
    // Check that gitmoji types are present
    const gitmojiChoice = choices.find(choice => choice.value === ':sparkles:');
    expect(gitmojiChoice).to.exist;
    expect(gitmojiChoice.name).to.include('✨');
    expect(gitmojiChoice.name).to.include('feat:');
    expect(gitmojiChoice.name).to.include('Introduce new features');
  });

  it('should use conventional types when useGitmoji is false', () => {
    const options = customOptions({ useGitmoji: false });
    const choices = getChoices(options);
    
    expect(choices).to.be.an('array');
    expect(choices.length).to.be.greaterThan(0);
    
    // Check that conventional types are present
    const conventionalChoice = choices.find(choice => choice.value === 'feat');
    expect(conventionalChoice).to.exist;
    expect(conventionalChoice.name).to.include('feat:');
    expect(conventionalChoice.name).to.include('A new feature');
  });

  it('should generate correct commit message with gitmoji', () => {
    const options = customOptions({ useGitmoji: true });
    const commitMessage = generateCommitMessage({
      type: ':sparkles:',
      scope: 'feature',
      subject: 'add new feature',
      body: 'This is a new feature',
      isBreaking: false,
      breaking: '',
      isIssueAffected: false,
      issues: ''
    }, options);
    
    expect(commitMessage).to.equal('feat(feature): ✨ add new feature\n\nThis is a new feature');
  });

  it('should handle gitmoji with breaking changes', () => {
    const options = customOptions({ useGitmoji: true });
    const commitMessage = generateCommitMessage({
      type: ':boom:',
      scope: 'api',
      subject: 'change API structure',
      body: 'Updated API structure',
      isBreaking: true,
      breaking: 'API response format changed',
      isIssueAffected: false,
      issues: ''
    }, options);
    
    expect(commitMessage).to.equal('breaking(api): 💥 change API structure\n\nUpdated API structure\n\nBREAKING CHANGE: API response format changed');
  });
});

// Helper functions for gitmoji tests
function getChoices(options) {
  const questions = getQuestions(options);
  const typeQuestion = questions.find(q => q.name === 'type');
  return typeQuestion ? typeQuestion.choices : [];
}

function generateCommitMessage(answers, options) {
  return commitMessage(answers, options);
}

// Additional test cases
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

  it('should handle special characters in subject', () => {
    const specialSubject = 'fix: 🐛 bug with special chars @#$%^&*()';
    expect(
      commitMessage({
        type,
        subject: specialSubject
      })
    ).to.equal(`feat: ✨ ${specialSubject}`);
  });

  it('should handle unicode characters', () => {
    const unicodeSubject = '添加中文支持 🚀';
    expect(
      commitMessage({
        type,
        subject: unicodeSubject
      })
    ).to.equal(`feat: ✨ ${unicodeSubject}`);
  });

  it('should handle very long scope', () => {
    const longScope = 'a'.repeat(50);
    expect(
      commitMessage({
        type,
        scope: longScope,
        subject
      })
    ).to.equal(`feat(${longScope}): ✨ ${subject}`);
  });

  it('should handle whitespace-only subject', () => {
    expect(() =>
      commitMessage({
        type,
        subject: '   '
      })
    ).to.throw('subject is required');
  });

  it('should handle subject with only dots', () => {
    expect(() =>
      commitMessage({
        type,
        subject: '...'
      })
    ).to.throw('subject is required');
  });

  it('should handle subject with leading/trailing whitespace', () => {
    const trimmedSubject = '  trimmed subject  ';
    expect(
      commitMessage({
        type,
        subject: trimmedSubject
      })
    ).to.equal(`feat: ✨ trimmed subject`);
  });

  it('should handle subject with multiple trailing dots', () => {
    const subjectWithDots = 'subject with dots...';
    expect(
      commitMessage({
        type,
        subject: subjectWithDots
      })
    ).to.equal(`feat: ✨ subject with dots`);
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

  it('should handle docs type', () => {
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
        subject: 'refactor component'
      })
    ).to.equal('refactor: ♻️ refactor component');
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

  it('should handle perf type', () => {
    expect(
      commitMessage({
        type: ':zap:',
        subject: 'optimize performance'
      })
    ).to.equal('perf: ⚡️ optimize performance');
  });

  it('should handle ci type', () => {
    expect(
      commitMessage({
        type: ':construction_worker:',
        subject: 'update CI config'
      })
    ).to.equal('ci: 👷 update CI config');
  });

  it('should handle build type', () => {
    expect(
      commitMessage({
        type: ':building_construction:',
        subject: 'update build script'
      })
    ).to.equal('build: 🏗️ update build script');
  });
});

describe('breaking changes scenarios', () => {
  it('should handle breaking change without body', () => {
    expect(
      commitMessage({
        type,
        subject,
        isBreaking: true,
        breaking: 'API changed'
      })
    ).to.equal(`feat: ✨ ${subject}\n\nBREAKING CHANGE: API changed`);
  });

  it('should handle breaking change with body', () => {
    expect(
      commitMessage({
        type,
        subject,
        body,
        isBreaking: true,
        breaking: 'API changed'
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${body}\n\nBREAKING CHANGE: API changed`);
  });

  it('should handle breaking change with scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        isBreaking: true,
        breaking: 'API changed'
      })
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\nBREAKING CHANGE: API changed`);
  });

  it('should handle breaking change with issues', () => {
    expect(
      commitMessage({
        type,
        subject,
        isBreaking: true,
        breaking: 'API changed',
        isIssueAffected: true,
        issues: 'fix #123'
      })
    ).to.equal(`feat: ✨ ${subject}\n\nBREAKING CHANGE: API changed\n\nfix #123`);
  });

  it('should handle breaking change with body and issues', () => {
    expect(
      commitMessage({
        type,
        subject,
        body,
        isBreaking: true,
        breaking: 'API changed',
        isIssueAffected: true,
        issues: 'fix #123'
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${body}\n\nBREAKING CHANGE: API changed\n\nfix #123`);
  });
});

describe('issue handling scenarios', () => {
  it('should handle multiple issues', () => {
    expect(
      commitMessage({
        type,
        subject,
        isIssueAffected: true,
        issues: 'fix #123, close #456, ref #789'
      })
    ).to.equal(`feat: ✨ ${subject}\n\nfix #123, close #456, ref #789`);
  });

  it('should handle issues with body', () => {
    expect(
      commitMessage({
        type,
        subject,
        body,
        isIssueAffected: true,
        issues: 'fix #123'
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${body}\n\nfix #123`);
  });

  it('should handle issues with scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        isIssueAffected: true,
        issues: 'fix #123'
      })
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\nfix #123`);
  });
});

describe('configuration options', () => {
  it('should handle custom maxLineWidth', () => {
    const customOptions = {
      ...defaultOptions,
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
      ...defaultOptions,
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
      ...defaultOptions,
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
      ...defaultOptions,
      disableSubjectLowerCase: true
    };
    expect(
      commitMessage({
        type,
        subject: 'UPPERCASE_SUBJECT'
      }, customOptions)
    ).to.equal(`feat: ✨ UPPERCASE_SUBJECT`);
  });
});

describe('non-gitmoji mode', () => {
  it('should work without gitmoji', () => {
    expect(
      commitMessage({
        type: 'feat',
        subject
      }, createNonGitmojiOptions())
    ).to.equal(`feat: ${subject}`);
  });

  it('should work without gitmoji with scope', () => {
    expect(
      commitMessage({
        type: 'feat',
        scope,
        subject
      }, createNonGitmojiOptions())
    ).to.equal(`feat(${scope}): ${subject}`);
  });

  it('should work without gitmoji with body', () => {
    expect(
      commitMessage({
        type: 'feat',
        subject,
        body
      }, createNonGitmojiOptions())
    ).to.equal(`feat: ${subject}\n\n${body}`);
  });

  it('should work without gitmoji with breaking changes', () => {
    expect(
      commitMessage({
        type: 'feat',
        subject,
        isBreaking: true,
        breaking: 'API changed'
      }, createNonGitmojiOptions())
    ).to.equal(`feat: ${subject}\n\nBREAKING CHANGE: API changed`);
  });
});
