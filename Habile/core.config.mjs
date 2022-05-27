import 'dotenv/config';

const config = {
  tmi: {
    identity: {
      username: 'habilebot',
      password: process.env.OAUTH_TOKEN,
    },
    channels: ['habilebot', 'clembs'],
  },
};

export default config;
