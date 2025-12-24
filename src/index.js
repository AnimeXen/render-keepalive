export default {
  // Handle scheduled cron triggers
  async scheduled(event, env, ctx) {
    try {
      // Get the Render URL from environment variables
      const renderUrl = env.RENDER_URL;
      
      // Ping the Render URL
      const response = await fetch(renderUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Cloudflare-Worker-KeepAlive'
        }
      });
      
      console.log(`Pinged ${renderUrl} - Status: ${response.status}`);
      
      // Optional: Handle multiple URLs
      // const urls = [env.RENDER_URL_1, env.RENDER_URL_2];
      // await Promise.all(urls.map(url => fetch(url)));
      
    } catch (error) {
      console.error('Error keeping Render alive:', error);
    }
  },

  // Optional: Handle regular HTTP requests for testing
  async fetch(request, env, ctx) {
    return new Response('Render Keep-Alive Worker is running!', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
