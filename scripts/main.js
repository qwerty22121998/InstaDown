
$(document).on('change mouseover scroll', function (event) {
    addButton();
});

$(document).on("click", ".instaget-image", function (event) {

    var this_img = this.parentElement.parentElement.getElementsByClassName("_4rbun").item(0).firstChild;

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

    var this_vid = this.parentElement.getElementsByClassName("_qzesf").item(0).firstChild;

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
$(document).on('mousemove', '._e3il2._gxii9', function () {
    $(this).find(".action-button").show();
}).on('mouseout', '._e3il2._gxii9', function () {
    $(this).find(".action-button").hide();
});

$(document).on('mouseover', '._gwyj6', function () {
    $(this).find(".action-button").show();
}).on('mouseout', '._gwyj6', function () {
    $(this).find(".action-button").hide();
});

function addButton() {

    $('._e3il2._gxii9:not(:has(>.instaget-image))').prepend('<a href="javascript:void(0)" class="action-button shadow animate green instaget-image" title="Down this image" style="display: none;">⤵</a>');
    $('._l6uaz:not(:has(>.instaget-video))').append('<div class="instaget-video"></div>').parent().parent().parent().parent().parent().parent().append('<a href="javascript:void(0)" class="action-button shadow animate red instaget-video" title="Down this video"  style="display: none;">⤵</a>');
}

// long dz
