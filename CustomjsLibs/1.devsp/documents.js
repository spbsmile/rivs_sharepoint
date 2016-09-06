var list = null;
var listItems = null;
$(document).ready(function () {
    $(".welcome-image").hide();
    $(".welcome-content").hide();
    $(".link-item").on('click', function () {
        window.open($(this).find(".linkOrder").attr('href'), "_self");
    });
});
//# sourceMappingURL=documents.js.map