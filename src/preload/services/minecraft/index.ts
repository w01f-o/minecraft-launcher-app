import { MinecraftApi, StartMinecraftOptions } from '../../types/MinecraftApi'
import { Authenticator, Client } from 'minecraft-launcher-core'

export const minecraftApi: MinecraftApi = {
  launcher: new Client(),
  start(options: StartMinecraftOptions) {
    console.log(options.fullscreen)
    this.launcher.launch({
      root: './minecraft',
      version: {
        number: '1.14',
        type: 'release'
      },
      memory: {
        max: '6G',
        min: '4G'
      },
      authorization: Authenticator.getAuth('w01f'),
      window: {
        fullscreen: options.fullscreen
      }
    })

    this.launcher.on('debug', (e) => console.log(e))
    this.launcher.on('data', (e) => console.log(e))
    this.launcher.once('download', () => options.setIsLoading(false))
  }
}
