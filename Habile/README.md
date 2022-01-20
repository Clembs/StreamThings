# Habile

A Twitch bot made on tmi.js.

for now known as crbtbot but i'll change its name whenever im allowed to (in two months according to twitch)

## Features

- a ping command
- cool handler for the commands

## How to start

- `yarn start` to build with swc and run on node.js
- `yarn watch` to do that but also watch changes (isn't very cool yet)

## Command structure

```typescript
import { Command } from "../core/Command";

export = {
  name: "ping",
  handle(args) {
    this.reply("pong");
  },
} as Command;
```

`this` is basically a custom `CommandOptions` object, check the intellisense for the available stuff.

## Warning

- far from finished, in very early stage & i may break literally everything
