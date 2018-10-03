const CONTAINER_ARTICLE = ".M9sTE.L_LMM"
const CONTAINER_IMG = ".KL4Bh"
const CONTAINER_VID = "._5wCQW"
const CONTAINER_CONTROLER = ".ltpMr.Slqrh"
const CONTAINER_LEFTBTN = ".coreSpriteLeftChevron"
const CONTAINER_RIGHTBTN = ".coreSpriteRightChevron"

const getMediaUrl = dom => {
    let img = $(dom).find(CONTAINER_IMG)
    if (img.length > 0)
        return img[0].firstChild.getAttribute("src")
    let vid = $(dom).find(CONTAINER_VID)
    if (vid.length > 0)
        return vid[0].firstChild.getAttribute("src")
    return null
}

const cvtFromTextToElement = text => {
    let doc = new DOMParser().parseFromString(text, 'text/html')
    return doc.body.firstChild
}

const sendDownMsg = dom => {
    url = getMediaUrl(dom)
    chrome.runtime.sendMessage(url)
}

const newButton = dom => {
    let button = cvtFromTextToElement('<button class="oF4XW dCJp8 isg"><span class="glyphsSpriteDirect__outline__24__grey_9" aria-label="Download this image/video"></span></button>')
    $(button).click(() => {
        sendDownMsg(dom)
    })
    return button
}

const getButtonBar = dom => {
    return $(dom).find(CONTAINER_CONTROLER)[0]
}

const getMoveButton = dom => {
    return $.merge($(dom).find(CONTAINER_LEFTBTN), $(dom).find(CONTAINER_RIGHTBTN))
}


const addButtonToBar = (list, button) => {
    list.lastChild.before(button)
}

const addDownLoadButton = () => {
    $(CONTAINER_ARTICLE + ":not(:has(.isg))").each((index, element) => {
        let url = getMediaUrl(element)
        if (url != null) {
            addButtonToBar(getButtonBar(element), newButton(element))
        }
    })
}

$(document).on('change mouseover scroll', function (event) {
    addDownLoadButton();
});
