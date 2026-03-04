# DevIntel CLI

A production-oriented TypeScript CLI that helps developers gather intelligence from multiple services (GitHub, StackOverflow, Hacker News, OpenWeather, Quotable, npm registry, and DuckDuckGo Instant Answer).

## Features

- Object-oriented architecture with command and service classes.
- 10 practical commands for developer insights and productivity.
- Multi-API integrations with resilient error handling.
- Colored output via Chalk.
- Flags/options, help system, and version support.
- Strong input validation and typed models.

## Installation

```bash
npm install
npm run build
npm link
```

Then run:

```bash
devintel --help
devintel --version
```

## Environment Setup

Create `.env` in project root:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
```

Only weather-based commands require this key.

## Commands

1. `devintel github <username>` - GitHub profile analytics.
2. `devintel repo <owner/repo>` - GitHub repository insights.
3. `devintel weather <city> --units <metric|imperial>` - Current weather.
4. `devintel quote --tag <tag>` - Developer-friendly quote.
5. `devintel stack <tag> --limit <1-10>` - Top StackOverflow posts.
6. `devintel technews --limit <1-10>` - Top Hacker News stories.
7. `devintel package <npm-package>` - npm package metadata.
8. `devintel motivate` - Developer motivational quote.
9. `devintel ai <question...>` - AI-style tip based on query context.
10. `devintel today --city <city>` - Combined dashboard command.

## Architecture

```text
src/
  commands/      # command classes and registration
  services/      # API service clients
  models/        # interfaces and command contracts
  utils/         # validation, output, env, and error handling
  cli.ts         # app entrypoint
```

## Quality and Error Handling

- Axios network/API failures are normalized through `ErrorHandler`.
- Commands validate critical arguments and option ranges.
- Strong TypeScript typing with strict compiler mode.

## Example Usage

```bash
devintel github torvalds
devintel repo nodejs/node
devintel stack typescript --limit 3
devintel weather "San Francisco" --units imperial
devintel today --city "Berlin"
```
