/*
 * @adonisjs/lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type Ace from '@ioc:Adonis/Core/Ace'

/**
 * Seeder class to be used for testing
 */
export class TestsSeeder {
  constructor(private ace: typeof Ace, private connectionName?: string) {}

  private async runCommand(commandName: string) {
    const args: string[] = ['--compact-output']
    if (this.connectionName) {
      args.push(`--connection=${this.connectionName}`)
    }

    const command = await this.ace.exec(commandName, args)
    if (command.exitCode) {
      if (command.error) {
        throw command.error
      } else {
        throw new Error(`"${commandName}" failed`)
      }
    }
  }

  public async run() {
    await this.runCommand('db:seed')
  }
}
