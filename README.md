# @modulespress/vite-plugin

<p align="center">
  <img src="https://modulespress.devsroutes.co/logo.png" alt="ModulesPress Logo" width="200"/>
</p>

<p align="center">
  A Vite plugin for ModulesPress framework that enables modern frontend development in WordPress plugins.
</p>

## Features

- TypeScript and React support out of the box
- SCSS processing with modern API
- Hot Module Replacement (HMR) for PHP files
- Asset manifest generation
- Optimized build output structure

## Installation

```bash
npm install @modulespress/vite-plugin --save-dev
```

## Usage

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { ModulesPressVitePlugin } from '@modulespress/vite-plugin'

export default defineConfig({
  plugins: [
    ModulesPressVitePlugin({
      // options
    })
  ]
})
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `inputPatterns` | `string[]` | `['./**/*.(script.ts\|script.tsx)', './**/*.style.scss']` | Glob patterns for entry files |
| `pluginRootDir` | `string` | `'./'` | Root directory of your plugin |
| `scssOptions` | `Record<string, any>` | `{ api: 'modern-compiler' }` | SCSS compiler options |
| `refreshExtensions` | `string[] \| false` | `['.php']` | File extensions that trigger full page reload |

## Requirements

- Node.js 14.x or higher
- Vite 5.x
- TypeScript (for TypeScript usage)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Build the plugin: `npm run build`
5. Test your changes

### Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests if applicable
- Update documentation as needed

For major changes, please open an issue first to discuss what you would like to change.
