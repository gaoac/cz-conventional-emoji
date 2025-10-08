/**
 * Test helper functions for cz-conventional-emoji
 * 
 * This module provides shared utilities and helper functions
 * used across multiple test files to reduce code duplication.
 */

import { types } from 'conventional-commit-types';
import { gitmojis } from 'gitmojis';
import engine from '../../engine.js';

/**
 * Default configuration options for testing
 * These represent the standard configuration used in most test cases
 */
export const defaultOptions = {
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
export const createNonGitmojiOptions = () => ({
  ...defaultOptions,
  useGitmoji: false
});

/**
 * Test data constants used across multiple test cases
 * These provide consistent test inputs for various scenarios
 */
export const testData = {
  type: ':sparkles:',
  scope: 'everything',
  subject: 'testing123',
  body: 'A quick brown fox jumps over the dog',
  issues: 'a issues is not a person that kicks things',
  breakingChange: 'BREAKING CHANGE: ',
  breaking: 'asdhdfkjhbakjdhjkashd adhfajkhs asdhkjdsh ahshd'
};

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
export function commitMessage(answers, options) {
  const mergedOptions = { ...defaultOptions, ...options };
  let result = null;
  engine(mergedOptions).prompter(
    {
      prompt: (questions) => {
        return {
          then: (finalizer) => {
            processQuestions(questions, answers, mergedOptions);
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
export function processQuestions(questions, answers, options) {
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

/**
 * Helper function to get question configuration
 * @param {string} questionName - Name of the question
 * @param {Object} options - Engine configuration options
 * @returns {Object} Question configuration object
 */
export function getQuestion(questionName, options = defaultOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  let question = null;
  engine(mergedOptions).prompter(
    {
      prompt: (questions) => {
        question = questions.find(q => q.name === questionName);
        return { then: () => {} };
      }
    },
    () => {}
  );
  return question;
}

/**
 * Helper function to get all available choices
 * @param {Object} options - Engine configuration options
 * @returns {Array} Array of choice objects
 */
export function getChoices(options = defaultOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  const typeQuestion = getQuestion('type', mergedOptions);
  return typeQuestion ? typeQuestion.choices : [];
}

/**
 * Helper function to create custom options for testing
 * @param {Object} overrides - Options to override
 * @returns {Object} Custom options object
 */
export function customOptions(overrides = {}) {
  return {
    ...defaultOptions,
    ...overrides
  };
}

/**
 * Helper function to get question default value
 * @param {string} questionName - Name of the question
 * @param {Object} options - Engine configuration options
 * @returns {*} Default value for the question
 */
export function questionDefault(questionName, options = defaultOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  const question = getQuestion(questionName, mergedOptions);
  return question ? question.default : undefined;
}

/**
 * Helper function to get question prompt text
 * @param {string} questionName - Name of the question
 * @param {Object} answers - Current answers context
 * @param {Object} options - Engine configuration options
 * @returns {string} Prompt text for the question
 */
export function questionPrompt(questionName, answers = {}, options = defaultOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  const question = getQuestion(questionName, mergedOptions);
  if (!question) return '';
  
  return question.message && typeof question.message === 'string'
    ? question.message
    : question.message(answers);
}

/**
 * Helper function to get question filter function
 * @param {string} questionName - Name of the question
 * @param {Object} options - Engine configuration options
 * @returns {Function} Filter function for the question
 */
export function questionFilter(questionName, options = defaultOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  const question = getQuestion(questionName, mergedOptions);
  return question ? question.filter : null;
}

/**
 * Helper function to get question when condition
 * @param {string} questionName - Name of the question
 * @param {Object} answers - Current answers context
 * @param {Object} options - Engine configuration options
 * @returns {*} When condition result for the question
 */
export function questionWhen(questionName, answers = {}, options = defaultOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  const question = getQuestion(questionName, mergedOptions);
  return question && question.when ? question.when(answers) : undefined;
}
