// parent : _22yr2 _e0mru
// img : _jjzlb
// over : _ovg3g
$(document).on('change mouseover scroll', function (event) {
    addButton();
});

$(document).on("click", ".action-button", function (event) {
    
    var this_img = this.parentElement.parentElement.getElementsByClassName("_jjzlb").item(0).firstChild;

    var img_href = '"' + this_img.getAttribute("src") + '"';
    console.log("InstaGet extension:: Download -> " + img_href);
    if (img_href !== null) {
        var dl = document.createElement('a');
        dl.download = "";
        dl.href = img_href;
        dl.click();
        dl.remove();
    }
})


function addButton() {
    $('._ovg3g:not(:has(>.action-button))').prepend('<a href="javascript:void(0)" class="action-button shadow animate green" title="Down this image">⤵</a>');

}

addButton();

