addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname
  
    let htmlResponse
  
    // 根据请求路径返回相应的 HTML 页面
    if (path === '/' || path === '/login') {
      htmlResponse = await fetchHtml('login.html')
    } else if (path === '/index') {
      htmlResponse = await fetchHtml('index.html')
    } else if (path === '/navigation') {
      htmlResponse = await fetchHtml('navigation.html')
    } else if (path === '/snake') {
      htmlResponse = await fetchHtml('snake.html')
    } else {
      htmlResponse = new Response('Page not found', { status: 404 })
    }
  
    return htmlResponse
  }
  
  // 从 Worker 内部读取 HTML 文件
  async function fetchHtml(fileName) {
    const htmlFile = await fetch(`./${fileName}`)
    const html = await htmlFile.text()
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  }
  