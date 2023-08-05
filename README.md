# books-listing-app
## Main points 
- Vue app created with Vue 3 CLI and Vite 
- Configured Proxy via .env and vite.config.js to send API requests to Backend concurrent Node.js server to forward API requests with .env variables
- Parsed XML response from external API to JSON in Node.js server
## Lessons Learned 
- In Node.js, a fetch response in XML needs to be converted to text ( `response.text() `) before parsing to JSON
- When configuring the proxy, the URL path beyond the root path on the front-end URL is forwarded to the proxy server
  ```js
    server: {
    proxy: {
      '/api': {
        target: `${process.env.PROXY}${process.env.PORT}`, //             //localhost:7777  
        changeOrigin: true,                                // after proxy //localhost:7777/api
        secure: false,      

      },
    },
  },
  ```


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
