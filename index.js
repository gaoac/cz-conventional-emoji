'format cjs';

/**
 * cz-conventional-emoji - Commitizen adapter with gitmoji support
 * 
 * This module provides a Commitizen adapter that follows the conventional-changelog format
 * with gitmoji support. It integrates with commitlint configuration for header length validation.
 */

// Core dependencies
var engine = require('./engine');
var conventionalCommitTypes = require('conventional-commit-types');
var gitmojis = require('gitmojis').gitmojis;
var configLoader = require('commitizen').configLoader;

// Load commitizen configuration
var config = configLoader.load() || {};

/**
 * Configuration options with priority order:
 * 1. Environment variables (highest priority)
 * 2. Commitizen config file
 * 3. Default values (lowest priority)
 */
var options = {
  // Commit types configuration
  types: config.types || conventionalCommitTypes.types,
  
  // Default values for prompts
  defaultType: process.env.CZ_TYPE || config.defaultType,
  defaultScope: process.env.CZ_SCOPE || config.defaultScope,
  defaultSubject: process.env.CZ_SUBJECT || config.defaultSubject,
  defaultBody: process.env.CZ_BODY || config.defaultBody,
  defaultIssues: process.env.CZ_ISSUES || config.defaultIssues,
  
  // Text transformation options
  disableScopeLowerCase:
    process.env.DISABLE_SCOPE_LOWERCASE || config.disableScopeLowerCase,
  disableSubjectLowerCase:
    process.env.DISABLE_SUBJECT_LOWERCASE || config.disableSubjectLowerCase,
  
  // Layout and formatting options
  maxHeaderWidth:
    (process.env.CZ_MAX_HEADER_WIDTH &&
      parseInt(process.env.CZ_MAX_HEADER_WIDTH)) ||
    config.maxHeaderWidth ||
    100,
  maxLineWidth:
    (process.env.CZ_MAX_LINE_WIDTH &&
      parseInt(process.env.CZ_MAX_LINE_WIDTH)) ||
    config.maxLineWidth ||
    100,
  
  // Gitmoji support configuration
  useGitmoji:
    process.env.CZ_USE_GITMOJI !== undefined
      ? process.env.CZ_USE_GITMOJI === 'true'
      : config.useGitmoji !== undefined
        ? config.useGitmoji
        : true,
  gitmojis: gitmojis
};

/**
 * Integrate with commitlint configuration for header length validation
 * 
 * This function attempts to load commitlint configuration and override the default
 * maxHeaderWidth if a header-max-length rule is found. This ensures consistency
 * between commitizen and commitlint validation.
 * 
 * Note: This is asynchronous and runs after the module is exported, so the initial
 * export uses default values. The commitlint configuration is applied asynchronously.
 */
(function (options) {
  try {
    var commitlintLoad = require('@commitlint/load');
    commitlintLoad().then(function (clConfig) {
      if (clConfig.rules) {
        var maxHeaderLengthRule = clConfig.rules['header-max-length'];
        // Only override if:
        // 1. Rule exists and is properly formatted
        // 2. No environment variable override
        // 3. No commitizen config override
        if (
          typeof maxHeaderLengthRule === 'object' &&
          maxHeaderLengthRule.length >= 3 &&
          !process.env.CZ_MAX_HEADER_WIDTH &&
          !config.maxHeaderWidth
        ) {
          options.maxHeaderWidth = maxHeaderLengthRule[2];
        }
      }
    }).catch(function (err) {
      // Silently ignore errors and continue with default values
      // This ensures the adapter works even if commitlint is not configured
      if (process.env.DEBUG) {
        console.error('Failed to load commitlint config:', err);
      }
    });
  } catch (e) {
    // Silently ignore errors and continue with default values
    // This handles cases where @commitlint/load is not available
    if (process.env.DEBUG) {
      console.error('Failed to require @commitlint/load:', e);
    }
  }
})(options);

// Export the configured engine
module.exports = engine(options);
