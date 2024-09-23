import { Client } from 'minecraft-launcher-core'
import { Dispatch, SetStateAction } from 'react'

export interface StartMinecraftOptions {
  fullscreen: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export interface MinecraftApi {
  launcher: Client
  start: (options: StartMinecraftOptions) => void
}
