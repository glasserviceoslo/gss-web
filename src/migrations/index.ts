import * as migration_20250320_202027 from './20250320_202027'

export const migrations = [
  {
    up: migration_20250320_202027.up,
    down: migration_20250320_202027.down,
    name: '20250320_202027',
  },
]
