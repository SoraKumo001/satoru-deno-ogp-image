import { toHtml } from "satoru-render/preact";
import { render } from "satoru-render";
import { createCSS } from "satoru-render/tailwind";

Deno.serve(async (request) => {
  const url = new URL(request.url);
  if (url.pathname !== "/") {
    return new Response(null, { status: 404 });
  }

  const name = url.searchParams.get("name") ?? "Name";
  const title = url.searchParams.get("title") ?? "Title";
  const image = url.searchParams.get("image");

  const isDev =
    Deno.env.get("DENO_ENV") === "development" || url.hostname === "localhost";
  const cache = await caches.open("satoru-ogp");
  const cacheKey = new Request(url.toString());

  if (!isDev) {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) return cachedResponse;
  }

  const html = toHtml(
    <html className="bg-[#050505]">
      <body className="w-full h-full flex items-center justify-center p-0 m-0 bg-[#050505]">
        <div className="w-[1200px] h-[630px] flex relative bg-[#0a0a1a] text-white overflow-hidden font-['Noto_Sans_JP']">
          {/* Background Orbs */}
          <div className="absolute -top-[150px] -left-[150px] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px]" />
          <div className="absolute -bottom-[150px] -right-[150px] w-[600px] h-[600px] rounded-full bg-purple-600/30 blur-[150px]" />
          <div className="absolute top-[100px] right-[100px] w-[300px] h-[300px] rounded-full bg-pink-600/20 blur-[100px]" />
          <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[150px] opacity-40" />

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Main Content Container */}
          <div className="flex flex-col justify-center w-full h-full p-24 z-10">
            <div className="flex items-center gap-16">
              {/* Image / Logo Section */}
              {image && (
                <div className="shrink-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full scale-110 opacity-50" />
                    <img
                      className="relative rounded-[48px] border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      width={280}
                      height={280}
                      src={image}
                      alt=""
                    />
                  </div>
                </div>
              )}

              {/* Text Content Section */}
              <div className="flex flex-col gap-10 flex-1">
                <div className="flex flex-col gap-6">
                  <h1 className="text-[64px] font-black leading-[1.1] drop-shadow-[0_12px_12px_rgba(0,0,0,0.8)] line-clamp-4 overflow-hidden">
                    {title}
                  </h1>
                </div>

                {/* Footer Section - Integrated */}
                <div className="flex items-center gap-4 w-fit px-8 py-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div className="w-4 h-4 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] animate-pulse" />
                  <span className="text-3xl font-black tracking-widest text-white/95 uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                    {name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Border */}
          <div className="absolute inset-4 border border-white/10 rounded-4xl pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.05)]" />
        </div>
      </body>
    </html>,
  );
  // Render to PNG with automatic font resolution
  const png = await render({
    value: html,
    css: await createCSS(html),
    width: 1200,
    height: 630,
    format: "png",
  });
  const response = new Response(png as BodyInit, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": isDev
        ? "no-cache"
        : "public, max-age=31536000, immutable",
      date: new Date().toUTCString(),
    },
  });
  if (!isDev) {
    await cache.put(cacheKey, response.clone());
  }
  return response;
});
