addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    let htmlResponse;

    // 根据请求路径返回相应的 HTML 页面
    if (path === '/' || path === '/login') {
        htmlResponse = await fetchHtml('login.html');
    } else if (path === '/index') {
        htmlResponse = await fetchHtml('index.html');
    } else if (path === '/navigation') {
        htmlResponse = await fetchHtml('https://github.com/Rynlemon/store/main/navigation.html');
    } else if (path === '/snake') {
        htmlResponse = await fetchHtml('https://github.com/Rynlemon/store/main/snake.html');
    } else {
        htmlResponse = new Response('Page not found', { status: 404 });
    }

    return htmlResponse;
}

// 从 GitHub 原始 URL 获取 HTML 文件
async function fetchHtml(fileName) {
    const htmlFile = await fetch(`https://raw.githubusercontent.com/Rynlemon/store/main/f${filename}`);
    if (!htmlFile.ok) {
        return new Response('Failed to fetch file', { status: 404 });
    }
    const html = await htmlFile.text();
    return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
    });
}