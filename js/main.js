(function () {
  var d = document,
    root = d.documentElement,
    $ = function (s, c) {
      return Array.prototype.slice.call((c || d).querySelectorAll(s));
    };
  root.classList.add("js");
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setPal(p) {
    root.setAttribute("data-pal", p);
    $(".sw").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.p === p);
    });
    try {
      localStorage.setItem("pal", p);
    } catch (e) {}
  }
  try {
    var sp = localStorage.getItem("pal");
    if (sp) setPal(sp);
  } catch (e) {}
  $(".sw").forEach(function (b) {
    b.addEventListener("click", function () {
      setPal(b.dataset.p);
    });
  });
  var t = $("#track")[0];
  t.innerHTML += t.innerHTML;
  var roles = [
      "Front-End Developer",
      "React Builder",
      "Next.js Learner",
      "Problem Solver",
    ],
    ri = 0,
    ci = 0,
    del = false,
    el = $("#role")[0];
  function type() {
    var w = roles[ri];
    el.textContent = w.slice(0, ci);
    if (!del && ci < w.length) {
      ci++;
      setTimeout(type, 90);
    } else if (!del) {
      del = true;
      setTimeout(type, 1400);
    } else if (ci > 0) {
      ci--;
      setTimeout(type, 45);
    } else {
      del = false;
      ri = (ri + 1) % roles.length;
      setTimeout(type, 300);
    }
  }
  if (rm) {
    el.textContent = roles[0];
  } else {
    type();
  }
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          $("[data-n]", e.target).forEach(count);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  $(".rv").forEach(function (x) {
    io.observe(x);
  });
  function count(n) {
    var to = +n.dataset.n,
      s = n.dataset.s || "",
      st = null;
    if (rm) {
      n.textContent = to + s;
      return;
    }
    (function f(ts) {
      st = st || ts;
      var p = Math.min((ts - st) / 1200, 1);
      n.textContent = Math.round(to * p) + s;
      if (p < 1) requestAnimationFrame(f);
    })(performance.now());
  }
  $(".f").forEach(function (b) {
    b.addEventListener("click", function () {
      $(".f").forEach(function (x) {
        x.setAttribute("aria-pressed", x === b);
      });
      $(".card").forEach(function (c) {
        c.classList.toggle(
          "off",
          b.dataset.f !== "all" && c.dataset.t !== b.dataset.f,
        );
      });
    });
  });
  var toast = $("#toast")[0];
  function say(m) {
    toast.textContent = m;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 2000);
  }
  $("#copy")[0].addEventListener("click", function () {
    var m = "ahmedd7440776@gmail.com";
    try {
      navigator.clipboard.writeText(m).then(
        function () {
          say("Email copied");
        },
        function () {
          say(m);
        },
      );
    } catch (e) {
      say(m);
    }
  });
  if (!rm) {
    $(".tilt").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform =
          "rotateY(" + x * 10 + "deg) rotateX(" + -y * 10 + "deg)";
      });
      c.addEventListener("mouseleave", function () {
        c.style.transform = "";
      });
    });
    var g = $("#glow")[0];
    addEventListener("mousemove", function (e) {
      g.style.left = e.clientX + "px";
      g.style.top = e.clientY + "px";
    });
  }
  var bar = $("#bar")[0];
  addEventListener(
    "scroll",
    function () {
      var h = root.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    },
    { passive: true },
  );
})();
