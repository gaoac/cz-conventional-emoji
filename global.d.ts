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

      /**
       * Enable debug mode for additional logging
       */
      DEBUG?: string;
    }
  }
}

export {};
