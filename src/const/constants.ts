export const STORAGE_KEYS = {
  PICKER_TEAMS: 'randomPickerTeams', // New key for teams
  ACTIVE_TEAM_ID: 'randomPickerActiveTeamId',
} as const

export const ERROR_MESSAGES = {
  NO_ITEMS: 'No items available to pick from!',
  EMPTY_ITEM: 'Please enter an item',
  TOO_LONG: 'Item is too long',
} as const

export const MAX_ITEM_LENGTH = 100
