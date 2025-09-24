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
          "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
        );
      }
    },
  });

  return $svg;
};
