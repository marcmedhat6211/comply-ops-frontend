$(document).ready(function () {
  $("i.convert-svg").each(function () {
    var $img = $(this);
    convertSvgToIcon($img);
  });

  $("#mobile_menu_btn_open").click(function () {
    $("#mobile_menu").addClass("open");
    $("#menu_backdrop").addClass("open");
  });

  $("#mobile_menu_btn_close").click(function () {
    $("#mobile_menu").removeClass("open");
    $("#menu_backdrop").removeClass("open");
  });

  $("#menu_backdrop").click(function () {
    $("#mobile_menu").removeClass("open");
    $("#menu_backdrop").removeClass("open");
  });

  // Header scroll effect
  let lastScroll = 0;
  $(window).on("scroll", function () {
    const currentScroll = $(this).scrollTop();

    if (currentScroll > 50) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Scroll reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(
    ".card-1, .card-2, .banner-text, .img-container, .list-points .item, .section-header, .banner-section .section-content",
  );

  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // Page load animation
  setTimeout(() => {
    $("body").addClass("loaded");
  }, 100);

  // Preloader
  $(window).on("load", function () {
    setTimeout(() => {
      $(".preloader").addClass("fade-out");
      setTimeout(() => {
        $(".preloader").remove();
      }, 500);
    }, 800);
  });
});

const convertSvgToIcon = ($img) => {
  var imgID = $img.attr("id");
  var imgClass = $img.attr("class");
  var imgURL = $img.attr("data-src");
  if (typeof imgURL === "undefined") {
    return false;
  }

  $svg = getSvgIconByUrl(imgURL);
  if ($svg == null) {
    return false;
  }

  if (typeof imgID !== "undefined") {
    $svg = $svg.attr("id", imgID);
  }

  if (typeof imgClass !== "undefined") {
    $svg = $svg.attr("class", imgClass + " replaced-svg");
  }
  $img.replaceWith($svg);
};

const getSvgIconByUrl = (imgURL) => {
  var $svg = null;

  $.ajax({
    url: imgURL,
    type: "get",
    dataType: "xml",
    async: false,
    success: function (data) {
      $svg = $(data).find("svg");
      $svg = $svg.removeAttr("xmlns:a");

      if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
        $svg.attr(
          "viewBox",
          "0 0 " + $svg.attr("height") + " " + $svg.attr("width"),
        );
      }
    },
  });

  return $svg;
};
