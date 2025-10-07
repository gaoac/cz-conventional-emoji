'format cjs';

var wrap = require('word-wrap');
var map = require('lodash.map');
var longest = require('longest');
var chalk = require('chalk');

var filter = function(array) {
  return array.filter(function(x) {
    return x;
  });
};

var headerLength = function(answers) {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  );
};

var maxSummaryLength = function(options, answers) {
  return options.maxHeaderWidth - headerLength(answers);
};

var filterSubject = function(subject, disableSubjectLowerCase) {
  subject = subject.trim();
  if (!disableSubjectLowerCase && subject.charAt(0).toLowerCase() !== subject.charAt(0)) {
    subject =
      subject.charAt(0).toLowerCase() + subject.slice(1, subject.length);
  }
  while (subject.endsWith('.')) {
    subject = subject.slice(0, subject.length - 1);
  }
  return subject;
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function(options) {
  var types = options.types;
  var useGitmoji = options.useGitmoji;
  var gitmojis = options.gitmojis;

  // Use gitmoji types if enabled
  if (useGitmoji) {
    // Convert gitmojis array to conventional commit types format
    types = {};
    
    // English type name mapping for better understanding
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
    
    // Define preferred order based on conventional-commit-types
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
    
    // First add preferred types in order
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
    
    // Then add remaining gitmojis
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

  var choices = map(types, function(type, key) {
    if (useGitmoji) {
      // Format: emoji typeName: description (with proper alignment)
      var typeName = type.typeName;
      // Calculate length based on emoji + typeName for proper description alignment
      var typeNames = Object.values(types).map(function(t) { return t.typeName; });
      var maxTypeNameLength = longest(typeNames).length;
      var currentTypeNameLength = typeName.length;
      var padding = maxTypeNameLength - currentTypeNameLength;
      return {
        name: type.emoji + '  ' + typeName + ':' + ' '.repeat(padding) + ' ' + type.description,
        value: key
      };
    } else {
      var length = longest(Object.keys(types)).length + 1;
      return {
        name: (key + ':').padEnd(length) + ' ' + type.description,
        value: key
      };
    }
  });

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function(cz, commit) {
      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: "Select the type of change that you're committing:",
          choices: choices,
          default: options.defaultType
        },
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
                ? chalk.green
                : chalk.red;
            return color('(' + filteredSubject.length + ') ' + subject);
          },
          filter: function(subject) {
            return filterSubject(subject, options.disableSubjectLowerCase);
          }
        },
        {
          type: 'input',
          name: 'body',
          message:
            'Provide a longer description of the change: (press enter to skip)\n',
          default: options.defaultBody
        },
        {
          type: 'confirm',
          name: 'isBreaking',
          message: 'Are there any breaking changes?',
          default: false
        },
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
        {
          type: 'input',
          name: 'breaking',
          message: 'Describe the breaking changes:\n',
          when: function(answers) {
            return answers.isBreaking;
          }
        },

        {
          type: 'confirm',
          name: 'isIssueAffected',
          message: 'Does this change affect any open issues?',
          default: options.defaultIssues ? true : false
        },
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
        var wrapOptions = {
          trim: true,
          cut: false,
          newline: '\n',
          indent: '',
          width: options.maxLineWidth
        };

        // parentheses are only needed when a scope is present
        var scope = answers.scope ? '(' + answers.scope + ')' : '';

        // Hard limit this line in the validate
        var head;
        if (useGitmoji) {
          // Format: typeName(scope): emoji subject (standard-version compatible format)
          var selectedType = types[answers.type];
          var typeName = selectedType.typeName;
          head = typeName + scope + ': ' + selectedType.emoji + ' ' + answers.subject;
        } else {
          head = answers.type + scope + ': ' + answers.subject;
        }

        // Wrap these lines at options.maxLineWidth characters
        var body = answers.body ? wrap(answers.body, wrapOptions) : false;

        // Apply breaking change prefix, removing it if already present
        var breaking = answers.breaking ? answers.breaking.trim() : '';
        breaking = breaking
          ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '')
          : '';
        breaking = breaking ? wrap(breaking, wrapOptions) : false;

        var issues = answers.issues ? wrap(answers.issues, wrapOptions) : false;

        commit(filter([head, body, breaking, issues]).join('\n\n'));
      });
    }
  };
};
