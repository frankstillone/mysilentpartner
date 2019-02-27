$(document).on('keypress', function (e) {
    if (e.which == 13) {
        if ($("body .clickOnEnter").length) {
            $(".clickOnEnter").click();
        }
    }
});