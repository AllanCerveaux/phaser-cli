import { commonjs } from "@hyrious/esbuild-plugin-commonjs";
import { build } from 'esbuild';
(async () => {
  const builder = await build({
    entryPoints: ['src/index.ts'],
    outdir: 'build',
    bundle: true,
    sourcemap: true,
    incremental: true,
    minify: process.env.NODE_ENV === 'production',
    define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') },
    splitting: true,
    format: 'esm',
    platform: 'node',
    target: ['es6', 'esnext'],
    plugins: [commonjs()]
  }).catch(() => process.exit(1))
  console.log('🎊 App has build 🎉')
})()
