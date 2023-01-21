const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Homepage";
    },
  },

  {
    method: "*",
    path: "/",
    handler: (req, h) => {
      return `Halaman tidak dapat diakses dengan metode tersebut`;
    },
  },

  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "About page";
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (req, h) => {
      return `Halaman tidak dapat diakses dengan metode tersebut`;
    },
  },

  {
    method: "GET",
    path: "/hello/{name?}",
    handler: (req, h) => {
      const { name = "stranger" } = req.params;
      const { lang } = req.query;

      if (lang === "id") {
        return `hai, ${name}`;
      }

      return `hello, ${name}`;
    },
  },

  {
    method: "*",
    path: "/{any*}",
    handler: (req, h) => {
      return `Halaman tidak dapat ditemukan`;
    },
  },
];

module.exports = routes;
