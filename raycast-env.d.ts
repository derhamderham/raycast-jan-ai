/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Jan.ai API URL - Jan.ai API endpoint */
  "apiUrl": string,
  /** Jan.ai API Key - Your Jan.ai API key */
  "apiKey": string,
  /** Default Model - Jan.ai model to use (e.g., llama-3.1-8b-instruct) */
  "defaultModel": string,
  /** Temperature - Temperature for text generation (0.0-1.0) */
  "temperature": string,
  /** Max Tokens - Maximum tokens for responses */
  "maxTokens": string,
  /** Reminder List Name - Apple Reminders list to add tasks to */
  "reminderList": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `process-text` command */
  export type ProcessText = ExtensionPreferences & {}
  /** Preferences accessible in the `quick-actions` command */
  export type QuickActions = ExtensionPreferences & {}
  /** Preferences accessible in the `create-reminder` command */
  export type CreateReminder = ExtensionPreferences & {}
  /** Preferences accessible in the `reminders-to-csv` command */
  export type RemindersToCsv = ExtensionPreferences & {}
  /** Preferences accessible in the `create-reminder-from-pdf-direct` command */
  export type CreateReminderFromPdfDirect = ExtensionPreferences & {}
  /** Preferences accessible in the `process-pdf-native` command */
  export type ProcessPdfNative = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `process-text` command */
  export type ProcessText = {
  /** Text to process (optional - uses clipboard if empty) */
  "text": string
}
  /** Arguments passed to the `quick-actions` command */
  export type QuickActions = {}
  /** Arguments passed to the `create-reminder` command */
  export type CreateReminder = {
  /** e.g., 'Call dentist tomorrow' or 'Electric bill $150 due Jan 15' */
  "text": string
}
  /** Arguments passed to the `reminders-to-csv` command */
  export type RemindersToCsv = {}
  /** Arguments passed to the `create-reminder-from-pdf-direct` command */
  export type CreateReminderFromPdfDirect = {}
  /** Arguments passed to the `process-pdf-native` command */
  export type ProcessPdfNative = {}
}

