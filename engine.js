'format cjs';

/**
 * cz-conventional-emoji Engine
 * 
 * This module provides the core engine for generating conventional commit messages
 * with gitmoji support. It handles the interactive prompt flow and message formatting
 * according to the conventional commit specification.
 */

// External dependencies
var wrap = require('word-wrap');
var longest = require('longest');
var chalk = require('chalk');

/**
 * Utility function to filter out falsy values from an array
 * @param {Array} array - Array to filter
 * @returns {Array} Filtered array with only truthy values
 */
var filter = function(array) {
  return array.filter(function(x) {
    return x;
  });
};

/**
 * Calculate the length of the commit header (type + scope)
 * @param {Object} answers - User answers containing type and scope
 * @returns {number} Header length including separators
 */
var headerLength = function(answers) {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  );
};

/**
 * Calculate the maximum allowed length for the subject line
 * @param {Object} options - Configuration options
 * @param {Object} answers - User answers
 * @returns {number} Maximum subject length
 */
var maxSummaryLength = function(options, answers) {
  return options.maxHeaderWidth - headerLength(answers);
};

/**
 * Process and normalize the subject line
 * @param {string} subject - Raw subject input
 * @param {boolean} disableSubjectLowerCase - Whether to disable lowercase conversion
 * @returns {string} Processed subject
 */
var filterSubject = function(subject, disableSubjectLowerCase) {
  subject = subject.trim();
  // Convert first character to lowercase unless disabled
  if (!disableSubjectLowerCase && subject.charAt(0).toLowerCase() !== subject.charAt(0)) {
    subject =
      subject.charAt(0).toLowerCase() + subject.slice(1, subject.length);
  }
  // Remove trailing dots
  while (subject.endsWith('.')) {
    subject = subject.slice(0, subject.length - 1);
  }
  return subject;
};

/**
 * Main engine function that creates the commitizen prompter
 * @param {Object} options - Configuration options
 * @returns {Object} Commitizen prompter object
 */
module.exports = function(options) {
  var types = options.types;
  var useGitmoji = options.useGitmoji;
  var gitmojis = options.gitmojis;

  // Convert gitmoji types to conventional commit format if enabled
  if (useGitmoji) {
    // Initialize types object for gitmoji-based types
    types = {};
    
    /**
     * Mapping of gitmoji codes to conventional commit type names
     * This provides better semantic meaning for gitmoji-based commits
     */
    var typeNameMap = {
      ':sparkles:': 'feat',
      ':bug:': 'fix',
      ':memo:': 'docs',
      ':lipstick:': 'style',
      ':recycle:': 'refactor',
      ':white_check_mark:': 'test',
      ':wrench:': 'chore',
      ':zap:': 'perf',
      ':construction_worker:': 'ci',
      ':building_construction:': 'build',
      ':rewind:': 'revert',
      ':construction:': 'wip',
      ':lock:': 'security',
      ':rocket:': 'release',
      ':boom:': 'breaking',
      ':ambulance:': 'hotfix',
      ':fire:': 'remove',
      ':tada:': 'init',
      ':closed_lock_with_key:': 'secrets',
      ':bookmark:': 'version',
      ':rotating_light:': 'warn',
      ':green_heart:': 'ci-fix',
      ':arrow_down:': 'downgrade',
      ':arrow_up:': 'upgrade',
      ':pushpin:': 'pin',
      ':chart_with_upwards_trend:': 'analytics',
      ':heavy_plus_sign:': 'deps-add',
      ':heavy_minus_sign:': 'deps-remove',
      ':globe_with_meridians:': 'i18n',
      ':pencil2:': 'chore',
      ':poop:': 'bad-code',
      ':twisted_rightwards_arrows:': 'merge',
      ':package:': 'package',
      ':alien:': 'external-api',
      ':truck:': 'move',
      ':page_facing_up:': 'license',
      ':bento:': 'assets',
      ':wheelchair:': 'accessibility',
      ':bulb:': 'comments',
      ':beers:': 'drunk-code',
      ':speech_balloon:': 'text',
      ':card_file_box:': 'database',
      ':loud_sound:': 'logs',
      ':mute:': 'remove-logs',
      ':busts_in_silhouette:': 'contributors',
      ':children_crossing:': 'ux',
      ':iphone:': 'responsive',
      ':clown_face:': 'mock',
      ':egg:': 'easter-egg',
      ':see_no_evil:': 'gitignore',
      ':camera_flash:': 'snapshots',
      ':alembic:': 'experiment',
      ':mag:': 'seo',
      ':label:': 'types',
      ':seedling:': 'seed',
      ':triangular_flag_on_post:': 'feature-flags',
      ':goal_net:': 'error-handling',
      ':dizzy:': 'animation',
      ':wastebasket:': 'deprecate',
      ':passport_control:': 'auth',
      ':adhesive_bandage:': 'quick-fix',
      ':monocle_face:': 'data-analysis',
      ':coffin:': 'dead-code',
      ':test_tube:': 'failing-test',
      ':necktie:': 'business-logic',
      ':stethoscope:': 'health-check',
      ':bricks:': 'infrastructure',
      ':technologist:': 'dx',
      ':money_with_wings:': 'sponsors',
      ':thread:': 'concurrency',
      ':safety_vest:': 'validation',
      ':airplane:': 'offline'
    };
    
    /**
     * Preferred order for gitmoji types based on conventional-commit-types
     * This ensures the most common types appear first in the selection list
     */
    var preferredOrder = [
      ':sparkles:', // feat
      ':bug:', // fix
      ':ambulance:', // hotfix
      ':memo:', // docs
      ':lipstick:', // style
      ':recycle:', // refactor
      ':zap:', // perf
      ':white_check_mark:', // test
      ':building_construction:', // build
      ':construction_worker:', // ci
      ':pencil2:', // chore
      ':rewind:' // revert
    ];
    
    // Add preferred types first to ensure they appear at the top
    preferredOrder.forEach(function(code) {
      var gitmoji = gitmojis.find(function(g) { return g.code === code; });
      if (gitmoji) {
        var typeName = typeNameMap[gitmoji.code] || gitmoji.name;
        types[gitmoji.code] = {
          description: gitmoji.description,
          title: gitmoji.name,
          emoji: gitmoji.emoji,
          typeName: typeName
        };
      }
    });
    
    // Add remaining gitmojis that weren't in the preferred order
    gitmojis.forEach(function(gitmoji) {
      if (!types[gitmoji.code]) {
        var typeName = typeNameMap[gitmoji.code] || gitmoji.name;
        types[gitmoji.code] = {
          description: gitmoji.description,
          title: gitmoji.name,
          emoji: gitmoji.emoji,
          typeName: typeName
        };
      }
    });
  }

  /**
   * Generate formatted choices for the type selection prompt
   * Handles both gitmoji and conventional commit formats with proper alignment
   */
  var choices = Object.entries(types).map(function([key, type]) {
    if (useGitmoji) {
      // Format: emoji typeName: description (with proper alignment)
      var typeName = type.typeName;
      // Calculate padding for proper description alignment
      var typeNames = Object.values(types).map(function(t) { return t.typeName; });
      var maxTypeNameLength = longest(typeNames).length;
      var currentTypeNameLength = typeName.length;
      var padding = maxTypeNameLength - currentTypeNameLength;
      return {
        name: type.emoji + '  ' + typeName + ':' + ' '.repeat(padding) + ' ' + type.description,
        value: key
      };
    } else {
      // Format: type: description (with proper alignment)
      var length = longest(Object.keys(types)).length + 1;
      return {
        name: (key + ':').padEnd(length) + ' ' + type.description,
        value: key
      };
    }
  });

  return {
    /**
     * Commitizen prompter function
     * 
     * This function is called when a user runs `git cz`. It handles the interactive
     * prompt flow to collect commit information and generates the final commit message.
     * 
     * @param {Object} cz - Commitizen instance (inquirer.js)
     * @param {Function} commit - Callback to execute with the final commit message
     */
    prompter: function(cz, commit) {
      // Interactive prompt flow to collect commit information
      cz.prompt([
        // Type selection prompt
        {
          type: 'list',
          name: 'type',
          message: "Select the type of change that you're committing:",
          choices: choices,
          default: options.defaultType
        },
        // Scope input prompt
        {
          type: 'input',
          name: 'scope',
          message:
            'What is the scope of this change (e.g. component or file name): (press enter to skip)',
          default: options.defaultScope,
          filter: function(value) {
            return options.disableScopeLowerCase
              ? value.trim()
              : value.trim().toLowerCase();
          }
        },
        // Subject input prompt with validation and character count
        {
          type: 'input',
          name: 'subject',
          message: function(answers) {
            return (
              'Write a short, imperative tense description of the change (max ' +
              maxSummaryLength(options, answers) +
              ' chars):\n'
            );
          },
          default: options.defaultSubject,
          validate: function(subject, answers) {
            var filteredSubject = filterSubject(subject, options.disableSubjectLowerCase);
            return filteredSubject.length == 0
              ? 'subject is required'
              : filteredSubject.length <= maxSummaryLength(options, answers)
              ? true
              : 'Subject length must be less than or equal to ' +
                maxSummaryLength(options, answers) +
                ' characters. Current length is ' +
                filteredSubject.length +
                ' characters.';
          },
          transformer: function(subject, answers) {
            var filteredSubject = filterSubject(subject, options.disableSubjectLowerCase);
            var color =
              filteredSubject.length <= maxSummaryLength(options, answers)
                ? chalk.default.green
                : chalk.default.red;
            return color('(' + filteredSubject.length + ') ' + subject);
          },
          filter: function(subject) {
            return filterSubject(subject, options.disableSubjectLowerCase);
          }
        },
        // Body input prompt
        {
          type: 'input',
          name: 'body',
          message:
            'Provide a longer description of the change: (press enter to skip)\n',
          default: options.defaultBody
        },
        // Breaking changes confirmation
        {
          type: 'confirm',
          name: 'isBreaking',
          message: 'Are there any breaking changes?',
          default: false
        },
        // Breaking change body prompt (when no body provided)
        {
          type: 'input',
          name: 'breakingBody',
          default: '-',
          message:
            'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
          when: function(answers) {
            return answers.isBreaking && !answers.body;
          },
          validate: function(breakingBody, answers) {
            return (
              breakingBody.trim().length > 0 ||
              'Body is required for BREAKING CHANGE'
            );
          }
        },
        // Breaking changes description
        {
          type: 'input',
          name: 'breaking',
          message: 'Describe the breaking changes:\n',
          when: function(answers) {
            return answers.isBreaking;
          }
        },
        // Issue references confirmation
        {
          type: 'confirm',
          name: 'isIssueAffected',
          message: 'Does this change affect any open issues?',
          default: options.defaultIssues ? true : false
        },
        // Issue body prompt (when no body provided)
        {
          type: 'input',
          name: 'issuesBody',
          default: '-',
          message:
            'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:\n',
          when: function(answers) {
            return (
              answers.isIssueAffected && !answers.body && !answers.breakingBody
            );
          }
        },
        // Issue references input
        {
          type: 'input',
          name: 'issues',
          message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
          when: function(answers) {
            return answers.isIssueAffected;
          },
          default: options.defaultIssues ? options.defaultIssues : undefined
        }
      ]).then(function(answers) {
        // Text wrapping configuration for consistent formatting
        var wrapOptions = {
          trim: true,
          cut: false,
          newline: '\n',
          indent: '',
          width: options.maxLineWidth
        };

        // Format scope with parentheses if present
        var scope = answers.scope ? '(' + answers.scope + ')' : '';

        // Generate commit header based on gitmoji mode
        var head;
        if (useGitmoji) {
          // Format: typeName(scope): emoji subject (standard-version compatible format)
          var selectedType = types[answers.type];
          var typeName = selectedType.typeName;
          head = typeName + scope + ': ' + selectedType.emoji + ' ' + answers.subject;
        } else {
          // Format: type(scope): subject (conventional commit format)
          head = answers.type + scope + ': ' + answers.subject;
        }

        // Wrap body text at maxLineWidth characters
        var body = answers.body ? wrap(answers.body, wrapOptions) : false;

        // Format breaking changes with proper prefix
        var breaking = answers.breaking ? answers.breaking.trim() : '';
        breaking = breaking
          ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '')
          : '';
        breaking = breaking ? wrap(breaking, wrapOptions) : false;

        // Wrap issue references
        var issues = answers.issues ? wrap(answers.issues, wrapOptions) : false;

        // Combine all parts and filter out empty sections
        commit(filter([head, body, breaking, issues]).join('\n\n'));
      });
    }
  };
};
