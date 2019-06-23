const CONTAINER_ARTICLE = `.M9sTE.L_LMM`
const CONTAINER_IMG = `.KL4Bh`
const CONTAINER_VID = `._5wCQW`
const CONTAINER_CONTROLER = `.ltpMr.Slqrh`
const CONTAINER_LEFTBTN = `.POSa_`
const CONTAINER_RIGHTBTN = `._6CZji`
const BUTTON = `<button class="oF4XW dCJp8 isg"><span class="glyphsSpriteDirect__outline__24__grey_9" aria-label="Download this image/video"></span></button>`

class Util {
    static htmlToElement(text) {
        let template = document.createElement(`template`)
        template.innerHTML = text.trim()
        return template.content.firstChild
    }
}


class Manager {
    constructor(dom) {
        this.dom = dom
        this.index = 0
        this.button = $(Util.htmlToElement(BUTTON))
        this.left = false
        this.right = false
    }

    nextEntry() {
        this.index++
    }

    prevEntry() {
        this.index--
    }

    get buttonBar() {
        return $(this.dom).find(CONTAINER_CONTROLER)[0]
    }

    get leftButton() {
        return $(this.dom).find(CONTAINER_LEFTBTN)
    }

    get rightButton() {
        return $(this.dom).find(CONTAINER_RIGHTBTN)
    }

    getUrl(index) {
        let img = $(this.dom).find(CONTAINER_IMG)
        if (img.length > 0) return img[index].firstChild.getAttribute(`src`)
        let vid = $(this.dom).find(CONTAINER_VID)
        if (vid.length > 0) return vid[index].firstChild.getAttribute(`src`)
        return null
    }

    download() {
        let url = this.getUrl(this.index)
        chrome.runtime.sendMessage(url)
    }

    lrlisten() {
        let l = this.leftButton.length != 0
        if (this.l != l) {
            this.l = l
            this.leftButton.click(() => {
                this.prevEntry()
                this.lrlisten()
            })
        }

        let r = this.rightButton.length != 0
        if (this.r != r) {
            this.r = r
            this.rightButton.click(() => {
                this.nextEntry()
                this.lrlisten()
            })
        }

    }

    addDownloadButton() {
        this.buttonBar.lastChild.before(this.button[0])
        this.button.click(() => {
            this.download()
        })
        this.lrlisten()
    }
}


setInterval(() => {
    $(`${CONTAINER_ARTICLE}:not(:has(.isg))`).each((i, e) => {
        new Manager(e).addDownloadButton()
    })
}, 1000);