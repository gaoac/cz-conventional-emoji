/**
 * Tests for commit message generation functionality
 * 
 * This module contains tests for the core commit message generation logic,
 * including header formatting, body handling, and various message components.
 */

import { expect, describe, it } from 'vitest';
import { commitMessage, testData } from './helpers/test-helpers.js';

const { type, scope, subject, body, issues, breaking } = testData;

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
          disableSubjectLowerCase: true
        }
      )
    ).to.equal(`feat(${scope}): ✨ ${upperCaseSubject}\n\n${body}`);
  });

  it('header and body w/ issues', () => {
    expect(
      commitMessage({
        type,
        subject,
        body,
        issues
      })
    ).to.equal(`feat: ✨ ${subject}\n\n${body}\n\n${issues}`);
  });

  it('header and body w/ issues and scope', () => {
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


  it('header and body w/ issues and scope and breaking w/ out body and issues', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        isBreaking: true,
        breaking
      })
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\nBREAKING CHANGE: ${breaking}`);
  });

  it('header and body w/ issues and scope and breaking w/ out body and issues and scope', () => {
    expect(
      commitMessage({
        type,
        subject,
        isBreaking: true,
        breaking
      })
    ).to.equal(`feat: ✨ ${subject}\n\nBREAKING CHANGE: ${breaking}`);
  });
});

// Long text constants for testing text wrapping and formatting
const longBody =
  'a a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a' +
  'a a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a' +
  'a a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a';

const longBodySplit =
  longBody.slice(0, 100).trim() +
  '\n' +
  longBody.slice(100, 200).trim() +
  '\n' +
  longBody.slice(200, longBody.length).trim();

const longIssues =
  'b b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b' +
  'b b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b' +
  'b b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b bb b';

const longIssuesSplit =
  longIssues.slice(0, 100).trim() +
  '\n' +
  longIssues.slice(100, 200).trim() +
  '\n' +
  longIssues.slice(200, longIssues.length).trim();

describe('long text handling', () => {
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
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\n${body}\n\n${longIssuesSplit}`);
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
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\n${issues}`);
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
    ).to.equal(`feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\n${longIssuesSplit}`);
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
      `feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\nBREAKING CHANGE: ${breaking}\n\n${longIssuesSplit}`
    );
  });

  it('header, long body, breaking change (with prefix entered), and long issues w/ scope', () => {
    expect(
      commitMessage({
        type,
        scope,
        subject,
        body: longBody,
        breaking: `BREAKING CHANGE: ${breaking}`,
        issues: longIssues
      })
    ).to.equal(
      `feat(${scope}): ✨ ${subject}\n\n${longBodySplit}\n\nBREAKING CHANGE: ${breaking}\n\n${longIssuesSplit}`
    );
  });
});
