/**
 * Type definitions for cz-conventional-emoji
 * 
 * This package provides a Commitizen adapter with gitmoji support
 * following the conventional-changelog format.
 */

declare module 'cz-conventional-emoji' {
  import { Adapter } from 'commitizen';

  /**
   * Configuration options for cz-conventional-emoji
   */
  export interface CzConventionalEmojiOptions {
    /**
     * Conventional commit types configuration
     * @default conventionalCommitTypes.types
     */
    types?: Record<string, TypeDescription>;

    /**
     * Default commit type
     */
    defaultType?: string;

    /**
     * Default scope
     */
    defaultScope?: string;

    /**
     * Default subject
     */
    defaultSubject?: string;

    /**
     * Default body
     */
    defaultBody?: string;

    /**
     * Default issues
     */
    defaultIssues?: string;

    /**
     * Disable automatic lowercase conversion for scope
     * @default false
     */
    disableScopeLowerCase?: boolean;

    /**
     * Disable automatic lowercase conversion for subject
     * @default false
     */
    disableSubjectLowerCase?: boolean;

    /**
     * Maximum width for commit header
     * @default 100
     */
    maxHeaderWidth?: number;

    /**
     * Maximum width for commit body lines
     * @default 100
     */
    maxLineWidth?: number;

    /**
     * Enable gitmoji support
     * @default true
     */
    useGitmoji?: boolean;

    /**
     * Gitmoji definitions array
     */
    gitmojis?: Gitmoji[];
  }

  /**
   * Type description for conventional commits
   */
  export interface TypeDescription {
    /**
     * Human-readable description of the type
     */
    description: string;

    /**
     * Optional title for the type
     */
    title?: string;

    /**
     * Emoji representation (for gitmoji mode)
     */
    emoji?: string;

    /**
     * Conventional commit type name (for gitmoji mode)
     */
    typeName?: string;
  }

  /**
   * Gitmoji definition
   */
  export interface Gitmoji {
    /**
     * Gitmoji code (e.g., ':sparkles:')
     */
    code: string;

    /**
     * Unicode emoji character (e.g., '✨')
     */
    emoji: string;

    /**
     * Human-readable name
     */
    name: string;

    /**
     * Description of when to use this gitmoji
     */
    description: string;
  }

  /**
   * Commitizen adapter interface
   */
  export interface CommitAnswers {
    /**
     * Commit type or gitmoji code
     */
    type: string;

    /**
     * Optional scope
     */
    scope?: string;

    /**
     * Short commit message subject
     */
    subject: string;

    /**
     * Optional longer description
     */
    body?: string;

    /**
     * Whether this commit includes breaking changes
     */
    isBreaking?: boolean;

    /**
     * Breaking change description
     */
    breaking?: string;

    /**
     * Body for breaking changes (when no body provided)
     */
    breakingBody?: string;

    /**
     * Whether this commit affects open issues
     */
    isIssueAffected?: boolean;

    /**
     * Issue references (e.g., 'fix #123')
     */
    issues?: string;

    /**
     * Body for issue references (when no body provided)
     */
    issuesBody?: string;
  }

  /**
   * Commitizen prompter function type
   */
  export interface Prompter {
    /**
     * Main prompter function called by Commitizen
     * @param cz - Commitizen inquirer instance
     * @param commit - Callback function to execute with the final commit message
     */
    prompter(cz: any, commit: (message: string) => void): void;
  }

  /**
   * The main export is a Commitizen adapter
   */
  const adapter: Prompter;
  export default adapter;
}

/**
 * Environment variables supported by cz-conventional-emoji
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Default commit type
       */
      CZ_TYPE?: string;

      /**
       * Default scope
       */
      CZ_SCOPE?: string;

      /**
       * Default subject
       */
      CZ_SUBJECT?: string;

      /**
       * Default body
       */
      CZ_BODY?: string;

      /**
       * Default issues
       */
      CZ_ISSUES?: string;

      /**
       * Disable scope lowercase conversion ('true' or 'false')
       */
      DISABLE_SCOPE_LOWERCASE?: string;

      /**
       * Disable subject lowercase conversion ('true' or 'false')
       */
      DISABLE_SUBJECT_LOWERCASE?: string;

      /**
       * Maximum header width (numeric string)
       */
      CZ_MAX_HEADER_WIDTH?: string;

      /**
       * Maximum line width (numeric string)
       */
      CZ_MAX_LINE_WIDTH?: string;

      /**
       * Enable gitmoji support ('true' or 'false')
       * @default 'true'
       */
      CZ_USE_GITMOJI?: string;
    }
  }
}

