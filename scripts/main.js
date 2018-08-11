const ARTICLE_CLASS = "._8Rm4L.M9sTE.L_LMM.SgTZ1"
const IMG_CLASS = ".KL4Bh"
const VID_CLASS = "._5wCQW"
let getArticleList = () => {
    return $(ARTICLE_CLASS)
}
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

let newButton = url => {
    console.log(url)
    let button = cvtFromTextToElement('<button class="oF4XW dCJp8 isg"><span class="glyphsSpriteDirect__outline__24__grey_9" aria-label="Download this image/videos"></span></button>')
    button.addEventListener("click", () => {
        chrome.runtime.sendMessage(url)
    })
    return button
}

let getButtonBar = dom => {
    return dom.getElementsByClassName("eo2As")[0].getElementsByClassName("ltpMr Slqrh")[0]
}


let addButtonToBar = (list, button) => {
    list.lastChild.before(button)
}


let addDownLoadButton = () => {
    $(ARTICLE_CLASS + ":not(:has(.isg))").each((index, element) => {
        let url = getMediaUrl(element)
        if (url != null)
            addButtonToBar(getButtonBar(element), newButton(url))
    })
}

$(document).on('change mouseover scroll', function (event) {
    addDownLoadButton();
});