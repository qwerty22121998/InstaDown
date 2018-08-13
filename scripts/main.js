const ARTICLE_CLASS = "._8Rm4L.M9sTE.L_LMM.SgTZ1"
const IMG_CLASS = ".KL4Bh"
const VID_CLASS = "._5wCQW"
const BAR_CLASS = ".ltpMr.Slqrh"
const LEFT_MOVE = ".coreSpriteLeftChevron"
const RIGHT_MOVE = ".coreSpriteRightChevron"

let getMediaUrl = dom => {
    let img = $(dom).find(IMG_CLASS)
    if (img.length > 0)
        return img[0].firstChild.getAttribute("src")
    let vid = $(dom).find(VID_CLASS)
    if (vid.length > 0)
        return vid[0].firstChild.getAttribute("src")
    return null
}

let cvtFromTextToElement = text => {
    let doc = new DOMParser().parseFromString(text, 'text/html')
    return doc.body.firstChild
}

let sendDownMsg = dom => {
    url = getMediaUrl(dom)
    chrome.runtime.sendMessage(url)
}

let newButton = dom => {
    let button = cvtFromTextToElement('<button class="oF4XW dCJp8 isg"><span class="glyphsSpriteDirect__outline__24__grey_9" aria-label="Download this image/video"></span></button>')
    $(button).click(() => {
        sendDownMsg(dom)
    })
    return button
}

let getButtonBar = dom => {
    return $(dom).find(BAR_CLASS)[0]
}

let getMoveButton = dom => {
    return $.merge($(dom).find(LEFT_MOVE), $(dom).find(RIGHT_MOVE))
}


let addButtonToBar = (list, button) => {
    list.lastChild.before(button)
}

let addDownLoadButton = () => {
    $(ARTICLE_CLASS + ":not(:has(.isg))").each((index, element) => {
        let url = getMediaUrl(element)
        if (url != null) {
            addButtonToBar(getButtonBar(element), newButton(element))
        }
    })
}

$(document).on('change mouseover scroll', function (event) {
    addDownLoadButton();
});