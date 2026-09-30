import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// 로컬 `npm run dev`에서 /api/* 요청을 api/ 폴더의 Vercel Function으로 실행합니다.
// (배포 환경에서는 Vercel이 api/ 폴더를 직접 서빙하므로 이 플러그인은 쓰이지 않음)
function vercelApiDev(): Plugin {
  return {
    name: 'vercel-api-dev',
    apply: 'serve',
    configureServer(server) {
      // .env.local 값은 개발 서버(Node) 프로세스에만 넣고, 브라우저 번들에는 노출하지 않습니다.
      Object.assign(process.env, loadEnv('development', process.cwd(), ''))

      server.middlewares.use('/api', async (req, res) => {
        try {
          const url = new URL(req.originalUrl ?? req.url ?? '/', 'http://localhost')
          const mod = await server.ssrLoadModule(`/api${url.pathname.slice('/api'.length)}.ts`)
          const handler = mod[req.method ?? 'GET']
          if (typeof handler !== 'function') {
            res.statusCode = 405
            return res.end()
          }
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const body = chunks.length ? Buffer.concat(chunks) : undefined
          const response: Response = await handler(
            new Request(url, { method: req.method, headers: req.headers as HeadersInit, body }),
          )
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (err) {
          server.config.logger.error(String(err))
          res.statusCode = 500
          res.end()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    vercelApiDev(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
