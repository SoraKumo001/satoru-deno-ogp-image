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
  const cache = await caches.open("satoru-ogp2");
  const cacheKey = new Request(url.toString());

  if (!isDev) {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) return cachedResponse;
  }

  const html = toHtml(
    <html className="bg-[#020010]">
      <body className="w-full h-full flex items-center justify-center p-0 m-0 bg-[#020010]">
        <div className="w-[1200px] h-[630px] flex relative bg-[#020010] text-white overflow-hidden font-['Noto_Sans_JP']">

          {/* ============================================================ */}
          {/* LAYER 1: Deep Background Blur Orbs      */}
          {/* ============================================================ */}
          <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full bg-cyan-500/30 blur-[200px]" />
          <div className="absolute -bottom-[200px] -right-[150px] w-[800px] h-[800px] rounded-full bg-fuchsia-600/35 blur-[220px]" />
          <div className="absolute top-[30%] left-[35%] w-[500px] h-[500px] rounded-full bg-violet-700/25 blur-[250px]" />

          {/* ============================================================ */}
          {/* LAYER 2: Mid-level Blur Shapes              */}
          {/* ============================================================ */}
          {/* Cyan glow bloom - left side */}
          <div className="absolute top-[10%] left-[5%] w-[350px] h-[250px] rounded-full bg-cyan-400/20 blur-[100px]" />
          {/* Rose glow bloom - top right */}
          <div className="absolute -top-[40px] right-[10%] w-[300px] h-[300px] rounded-full bg-rose-500/18 blur-[120px]" />
          {/* Indigo accent bloom - center bottom */}
          <div className="absolute bottom-[5%] left-[30%] w-[400px] h-[200px] rounded-full bg-indigo-500/15 blur-[130px]" />
          {/* Sky accent - right center */}
          <div className="absolute top-[40%] right-[5%] w-[250px] h-[350px] rounded-full bg-sky-400/12 blur-[110px]" />

          {/* ============================================================ */}
          {/* LAYER 3: Blurred Light Streaks     */}
          {/* ============================================================ */}
          {/* Primary wide blurred streak */}
          <div
            className="absolute top-[15%] -left-[300px] w-[2000px] h-[60px] opacity-[0.08] blur-[30px]"
            style={{
              background: "linear-gradient(90deg, transparent, #22d3ee, #a78bfa, #e879f9, transparent)",
              transform: "rotate(-20deg)",
            }}
          />
          {/* Secondary thin blurred streak */}
          <div
            className="absolute top-[55%] -left-[200px] w-[1800px] h-[40px] opacity-[0.06] blur-[25px]"
            style={{
              background: "linear-gradient(90deg, transparent, #818cf8, #f472b6, transparent)",
              transform: "rotate(-15deg)",
            }}
          />
          {/* Accent sharp streak with blur halo */}
          <div
            className="absolute top-[25%] -left-[200px] w-[1800px] h-[2px] opacity-[0.15]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, #22d3ee 40%, #a855f7 60%, transparent 90%)",
              transform: "rotate(-20deg)",
            }}
          />
          {/* Blur halo behind the sharp streak */}
          <div
            className="absolute top-[25%] -left-[200px] w-[1800px] h-[2px] opacity-[0.25] blur-[8px]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, #22d3ee 40%, #a855f7 60%, transparent 90%)",
              transform: "rotate(-20deg)",
            }}
          />

          {/* ============================================================ */}
          {/* LAYER 4: Blurred Ring Decorations            */}
          {/* ============================================================ */}
          {/* Large blurred ring - top right */}
          <div className="absolute -top-[80px] -right-[80px] w-[350px] h-[350px] rounded-full border-[3px] border-fuchsia-400/20 blur-[6px]" />
          <div className="absolute -top-[80px] -right-[80px] w-[350px] h-[350px] rounded-full border-[1px] border-fuchsia-400/10 blur-[15px]" />
          {/* Small blurred ring - bottom left */}
          <div className="absolute -bottom-[50px] -left-[50px] w-[200px] h-[200px] rounded-full border-[2px] border-cyan-400/20 blur-[5px]" />
          <div className="absolute -bottom-[50px] -left-[50px] w-[200px] h-[200px] rounded-full border-[1px] border-cyan-400/15 blur-[12px]" />
          {/* Medium blurred ring - center right */}
          <div className="absolute top-[35%] right-[2%] w-[180px] h-[180px] rounded-full border-[2px] border-violet-400/15 blur-[8px]" />

          {/* ============================================================ */}
          {/* LAYER 5: Dot Grid with slight blur                          */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 opacity-[0.05] blur-[0.5px]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* ============================================================ */}
          {/* LAYER 6: Corner Accent                  */}
          {/* ============================================================ */}
          {/* Top-left */}
          <div className="absolute top-[24px] left-[24px] w-[70px] h-[2px] bg-cyan-400/50 blur-[1px] shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
          <div className="absolute top-[24px] left-[24px] w-[2px] h-[70px] bg-cyan-400/50 blur-[1px] shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
          {/* Top-right */}
          <div className="absolute top-[24px] right-[24px] w-[70px] h-[2px] bg-fuchsia-400/50 blur-[1px] shadow-[0_0_15px_rgba(232,121,249,0.6)]" />
          <div className="absolute top-[24px] right-[24px] w-[2px] h-[70px] bg-fuchsia-400/50 blur-[1px] shadow-[0_0_15px_rgba(232,121,249,0.6)]" />
          {/* Bottom-left */}
          <div className="absolute bottom-[24px] left-[24px] w-[70px] h-[2px] bg-violet-400/50 blur-[1px] shadow-[0_0_15px_rgba(167,139,250,0.6)]" />
          <div className="absolute bottom-[24px] left-[24px] w-[2px] h-[70px] bg-violet-400/50 blur-[1px] shadow-[0_0_15px_rgba(167,139,250,0.6)]" />
          {/* Bottom-right */}
          <div className="absolute bottom-[24px] right-[24px] w-[70px] h-[2px] bg-rose-400/50 blur-[1px] shadow-[0_0_15px_rgba(251,113,133,0.6)]" />
          <div className="absolute bottom-[24px] right-[24px] w-[2px] h-[70px] bg-rose-400/50 blur-[1px] shadow-[0_0_15px_rgba(251,113,133,0.6)]" />

          {/* ============================================================ */}
          {/* LAYER 7: Frosted Glass Content Panel                        */}
          {/* ============================================================ */}
          <div className="absolute inset-[40px] rounded-[24px] bg-white/[0.03] border border-white/[0.06] z-[5]" />
          {/* Inner glass panel blurred edge glow */}
          <div className="absolute inset-[38px] rounded-[26px] border border-white/[0.04] blur-[3px] z-[4]" />

          {/* ============================================================ */}
          {/* MAIN CONTENT                                                 */}
          {/* ============================================================ */}
          <div className="flex flex-col justify-center w-full h-full px-[85px] py-20 z-10">
            <div className="flex items-center gap-14">
              {/* Image / Avatar Section */}
              {image && (
                <div className="shrink-0">
                  <div className="relative">
                    {/* Avatar mega blur glow (outermost) */}
                    <div className="absolute -inset-[30px] rounded-full bg-cyan-500/15 blur-[50px]" />
                    <div className="absolute -inset-[20px] rounded-full bg-fuchsia-500/12 blur-[40px]" />
                    {/* Avatar gradient blur ring */}
                    <div className="absolute -inset-[8px] rounded-[54px] bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-50 blur-[18px]" />
                    {/* Avatar sharp gradient border */}
                    <div className="absolute -inset-[3px] rounded-[50px] bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-80" />
                    {/* Subtle blur haze on border */}
                    <div className="absolute -inset-[3px] rounded-[50px] bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-30 blur-[4px]" />
                    {/* Image */}
                    <img
                      className="relative rounded-[48px] shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                      width={250}
                      height={250}
                      src={image}
                      alt=""
                    />
                  </div>
                </div>
              )}

              {/* Text Content Section */}
              <div className="flex flex-col gap-8 flex-1">
                {/* Title with blur text glow */}
                <div className="relative">
                  {/* Blurred duplicate for glow effect */}
                  <h1
                    className="absolute top-0 left-0 text-[54px] font-black leading-[1.2] line-clamp-3 overflow-hidden text-cyan-300/20 blur-[12px]"
                    aria-hidden="true"
                  >
                    {title}
                  </h1>
                  {/* Actual title */}
                  <h1
                    className="relative text-[54px] font-black leading-[1.2] line-clamp-3 overflow-hidden"
                    style={{
                      textShadow:
                        "0 0 30px rgba(6,182,212,0.25), 0 0 60px rgba(139,92,246,0.12), 0 6px 12px rgba(0,0,0,0.8)",
                    }}
                  >
                    {title}
                  </h1>
                </div>

                {/* Author Badge with blur accents */}
                <div className="flex items-center gap-5 w-fit">
                  {/* Blurred accent line */}
                  <div className="relative">
                    <div
                      className="w-[50px] h-[3px] rounded-full blur-[6px] opacity-60"
                      style={{
                        background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
                      }}
                    />
                    <div
                      className="absolute top-0 left-0 w-[50px] h-[3px] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
                      }}
                    />
                  </div>
                  {/* Frosted name chip */}
                  <div className="relative">
                    {/* Chip blur glow */}
                    <div className="absolute -inset-[6px] rounded-full bg-violet-500/8 blur-[12px]" />
                    <div className="flex items-center gap-3 px-7 py-3 rounded-full border border-white/[0.1] bg-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]">
                      {/* Status dot with multi-layer blur glow */}
                      <div className="relative">
                        <div className="absolute -inset-[6px] rounded-full bg-emerald-400/40 blur-[8px]" />
                        <div className="w-[10px] h-[10px] rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
                      </div>
                      <span
                        className="text-[26px] font-bold tracking-[0.15em] text-white/90 uppercase"
                        style={{
                          textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                        }}
                      >
                        {name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Bottom Gradient Bar with heavy blur glow                     */}
          {/* ============================================================ */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #d946ef, #f43f5e)",
            }}
          />
          {/* Blur layer 1 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[30px] opacity-50 blur-[15px]"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #d946ef, #f43f5e)",
            }}
          />
          {/* Blur layer 2 - wider spread */}
          <div
            className="absolute -bottom-[10px] left-0 right-0 h-[50px] opacity-20 blur-[35px]"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #d946ef, #f43f5e)",
            }}
          />

          {/* ============================================================ */}
          {/* Outer Frame */}
          {/* ============================================================ */}
          <div className="absolute inset-[6px] border border-white/[0.04] rounded-[20px] pointer-events-none" />
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
