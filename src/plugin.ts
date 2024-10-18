import fg from 'fast-glob';
import path from 'path';
import { Plugin, UserConfig } from 'vite';

interface ModulesPressPluginOptions {
    inputPatterns?: string[];
    pluginRootDir?: string;
    scssOptions?: Record<string, any>;
    refreshExtensions?: string[] | false
}

/**
 * Official ModulesPress Plugin
 */
export function ModulesPressVitePlugin(options: ModulesPressPluginOptions = {}): Plugin {

    const {
        inputPatterns = ['./**/*.(script.ts|script.tsx)', './**/*.style.scss'],
        pluginRootDir = './',
        scssOptions = { api: 'modern-compiler' },
        refreshExtensions = ['.php']
    } = options

    const root = path.resolve(pluginRootDir);
    console.log({ PluginRootDir: root });

    // Gather inputs based on custom or default patterns
    const input = fg.sync(inputPatterns);
    console.log({ InputsDetected: input });

    return {
        name: 'vite:modulespress',
        config: (): UserConfig => ({
            root: root,
            publicDir: './static',
            build: {
                manifest: true,
                sourcemap: true,
                outDir: './build/assets',
                emptyOutDir: true,
                rollupOptions: {
                    input: input,
                    output: {
                        entryFileNames: 'js/[name].[hash].js',
                        assetFileNames: (assetInfo) => {
                            console.log(assetInfo);
                            if (/\.css$/.test(assetInfo.name as string)) {
                                return 'css/[name].[hash].css';
                            }
                            return '[name].[hash][extname]';
                        },
                    },
                },
            },
            esbuild: {
                loader: 'tsx',
                jsxFactory: 'React.createElement',
                jsxFragment: 'React.Fragment',
            },
            optimizeDeps: {
                esbuildOptions: {
                    loader: {
                        '.ts': 'tsx',
                        '.tsx': 'tsx',
                    },
                },
            },
            // resolve: {
            //     alias: [
            //         { find: '@static', replacement: fileURLToPath(new URL('./static', import.meta.url)) },
            //         { find: '@resources', replacement: fileURLToPath(new URL('./resources', import.meta.url)) },
            //     ],
            // },
            css: {
                preprocessorOptions: {
                    scss: scssOptions,
                },
            },
        }),
        handleHotUpdate: refreshExtensions === false ?
            undefined :
            ({ file, server }) => {
                if (refreshExtensions.some(ext => file.endsWith(ext))) {
                    server.ws.send({ type: 'full-reload' });
                }
            },
    };
}