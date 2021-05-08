const express = require("express");
const next = require("next");
const compression = require("compression");

const shrinkRay = require("shrink-ray-current");
var expressStaticGzip = require("express-static-gzip");

const LRUCache = require("lru-cache");

const ssrCache = new LRUCache({
  max: 200,
  maxAge: 1000 * 60 * 60 * 24, // 24 hrs cache time
});

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

server.use(shrinkRay());

server.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === "/" && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1));
  else next();
});

app
  .prepare()
  .then(() => {
    server.get("/places/:slug", (req, res) => {
      const actualPage = "/single-place";
      const queryParams = { slug: req.params.slug };

      renderAndCache(req, res, actualPage, queryParams);
    });

    server.use("/sitemap.xml", express.static(__dirname + "/sitemap.xml"));
    server.use("/ads.txt", express.static(__dirname + "/ads.txt"));
    server.use("/sw.js", express.static(__dirname + "/static/sw.js"));
    server.use(
      "/manifest.json",
      express.static(__dirname + "/static/manifest.json")
    );
    server.use(
      "/workbox-c2b5e142.js",
      express.static(__dirname + "/static/workbox-c2b5e142.js")
    );
    server.get("/robots.txt", function (req, res) {
      res.type("text/plain");
      res.send(
        "User-Agent: * \nDisallow: \nDisallow: /? \n"
      );
    });

    server.get("/api/delete/cache/:key", (req, res) => {
      deleteCache(req, res, "/", {});
    });

    server.get("/", (req, res) => {
      renderAndCache(req, res, "/", {});
    });

    server.use(
      "/static",
      expressStaticGzip("/static", {
        enableBrotli: true,
        orderPreference: ["br", "gz"],
        setHeaders: function (res, path) {
          res.setHeader("Cache-Control", "public, max-age=4444444444");
        },
      })
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

   
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

server.listen(3003, (err) => {
  if (err) throw err;
  console.log("> Ready on http://localhost:3002");
});

function getCacheKey(req) {
  //TODO clean-up, standardize an url to maximize cache hits
  return req.url;
}

function deleteCache(req, res, pagePath, queryParams) {
  const key = queryParams.key;
  if (key) {
    ssrCache.del(key);
  }
}

async function renderAndCache(req, res, pagePath, queryParams) {
  //TODO add a way to purge cache for a specific url
  const key = getCacheKey(req);

  //  If we have a page in the cache, let's serve it
  if (!dev && ssrCache.has(key)) {
    res.setHeader("x-cache", "HIT");
    console.log("serving from cache ", key);
    res.send(ssrCache.get(key));
    return;
  }

  // No cache present for specific key? let's try to render and cache
  try {
    const html = await app.renderToHTML(req, res, pagePath, queryParams);
    // If something is wrong with the request, let's not cache
    // Send the generated content as is for further inspection
    ssrCache.has(key, html) && ssrCache.del(key, html);
    if (res.statusCode !== 200) {
      res.setHeader("x-cache", "SKIP");
      console.log("Cache miss  ", key);
      res.send(html);
      return;
    }

    // Everything seems OK... let's cache
    ssrCache.set(key, html);
    res.setHeader("x-cache", "MISS");
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
