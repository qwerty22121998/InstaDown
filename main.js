// parent : _22yr2 _e0mru
// img : _jjzlb
// over : _ovg3g
$(document).on('change mouseover scroll', function (event) {
    addButton();
});

$(document).on("click", ".instaget-image", function (event) {

    var this_img = this.parentElement.parentElement.getElementsByClassName("_jjzlb").item(0).firstChild;

    var img_href = this_img.getAttribute("src");
    console.log("InstaGet extension:: Download image -> " + img_href);
    if (img_href !== null) {
        var dl = document.createElement('a');
        dl.download = '';
        dl.href = img_href;
        dl.click();
        dl.remove();
    }
})

$(document).on("click", ".instaget-video", function (event) {

    var this_vid = this.parentElement.getElementsByClassName("_2tomm").item(0).firstChild;

    var vid_href = this_vid.getAttribute("src");
    console.log("InstaGet extension:: Download video -> " + vid_href);
    if (vid_href !== null) {
        var dl = document.createElement('a');
        dl.download = '';
        dl.href = vid_href;
        dl.click();
        dl.remove();
    }
})


function addButton() {
    $('._ovg3g:not(:has(>.instaget-image))').prepend('<a href="javascript:void(0)" class="action-button shadow animate green instaget-image" title="Down this image">⤵</a>');
    $('._ikcuh:not(:has(>.instaget-video))').filter(':not(:has(>.instaget-image))').append('<a href="javascript:void(0)" class="action-button shadow animate red instaget-video" title="Down this video">⤵</a>');
}



