import server, { error, log } from 'create-serve';
import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';

(async () => {
  log(process.env.NODE_ENV)
  const watcher = process.argv.includes('-w')
  const builder = await build({
    bundle: true,
    define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
    entryPoints: ['src/index.js'],
    incremental: true,
    minify: process.env.NODE_ENV === "production",
    outdir: "dist",
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: ['src/assets/*'],
            to: ['dist/assets/*']
          },
          {
            from: ['src/index.html'],
            to: ['dist/index.html']
          }
        ]
      })
    ],
    watch: watcher && {
      onRebuild(err) {
        server.update()
        err ? error('× Failed') : log('✓ Updated')
      }
    }
  }).catch(() => process.exit(1))
  if (watcher) {
    server.start({
      port: +process.env.PORT || 1337,
      root: './dist',
    })
  }
  
  if(process.env.NODE_ENV === 'production') {
    log('🎊 Game has build 🎉')
    process.exit()
  }
})()
