import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";

const site = lume({
  server: {
    page404: "404.html",
  },
});

site.use(date());

site.ignore("readme.md");

site.copy("lupu");
site.copy("main.css");
site.copy("assets");
site.copy("favicon.png");
site.copy("favicon.svg");

export default site;
