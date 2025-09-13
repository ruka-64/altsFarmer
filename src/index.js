import { Client } from 'discord.js-selfbot-v13';
import { sender } from './sender.js';
import { Options } from 'discord.js-selfbot-v13';
import { config } from '../config.js';

export const client = new Client({
  makeCache: Options.cacheWithLimits({
    UserManager: 10,
    GuildMemberManager: 0,
    PresenceManager: 0,
    VoiceStateManager: 0,
    MessageManager: 0,
    RoleManager: 0,
  }),
  http: {
    headers: {
      'Accept-Language': 'ja-JP',
      'User-Agent': 'Discord-Android/126021',
    },
  },
  ws: {
    properties: {
      browser: 'Discord Android',
      browser_user_agent: 'Discord-Android/126021',
      client_build_number: 126021,
      client_version: '126.21 - Stable',
      device: 'sdk_gphone64_x86_64, sdk_gphone64_x86_64',
      os: 'Android',
      os_sdk_version: '33',
      os_version: '13',
      system_locale: 'ja-JP',
      accessibility_support_enabled: false,
      accessibility_features: 128,
      client_performance_cpu: 11,
      client_performance_memory: 246220,
      cpu_core_count: 4,
    },
  },
});

client.on('ready', async (client) => {
  console.log(`[Discord] logged in as ${client.user.username}`);
  await sender();
});

client.login(config.token);

const shutdown = () => {
  client.destroy();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('uncaughtException', (e) => console.error(e));
