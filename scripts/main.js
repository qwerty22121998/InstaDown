const ContainerArticle = `.M9sTE.L_LMM`
const ContainerImage = `.KL4Bh`
const ContainerVideo = `._5wCQW`
const ContainerController = `.ltpMr.Slqrh`
const ContainerLeftBtn = `.POSa_`
const ContainerRightBtn = `._6CZji`

const DownloadIcon = `
<svg width="24" height="24" viewBox="0 0 477.867 477.867">
    <path
        d="M443.733,307.2c-9.426,0-17.067,7.641-17.067,17.067v102.4c0,9.426-7.641,17.067-17.067,17.067H68.267
			c-9.426,0-17.067-7.641-17.067-17.067v-102.4c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v102.4
			c0,28.277,22.923,51.2,51.2,51.2H409.6c28.277,0,51.2-22.923,51.2-51.2v-102.4C460.8,314.841,453.159,307.2,443.733,307.2z"
    />

    <path
        d="M335.947,295.134c-6.614-6.387-17.099-6.387-23.712,0L256,351.334V17.067C256,7.641,248.359,0,238.933,0
			s-17.067,7.641-17.067,17.067v334.268l-56.201-56.201c-6.78-6.548-17.584-6.36-24.132,0.419c-6.388,6.614-6.388,17.099,0,23.713
			l85.333,85.333c6.657,6.673,17.463,6.687,24.136,0.031c0.01-0.01,0.02-0.02,0.031-0.031l85.333-85.333
			C342.915,312.486,342.727,301.682,335.947,295.134z"
    />
</svg>
`
const DownloadButton = `<button class="wpO6b">${DownloadIcon}</button>`



html2node = html => {
    let template = document.createElement('template')
    template.innerHTML = html.trim()
    return template.content.firstChild
}

sendDownloadMessage = url => chrome.runtime.sendMessage(url)

class Downloader {
    elem = null

    constructor(elem) {
        this.elem = elem
    }

    buttonBar = () => this.elem.querySelector(ContainerController)


    download = () => {
        let media = this.currentMedia()

        let url = media.firstChild.getAttribute('src')
        sendDownloadMessage(url)
    }

    downloadButton = () => {
        let button = html2node(DownloadButton)
        button.addEventListener("click", this.download)
        return button
    }

    listMedia = () => {
        let images = this.elem.querySelectorAll(ContainerImage)
        let videos = this.elem.querySelectorAll(ContainerVideo)
        return [...images, ...videos]
    }

    currentMedia = () => {
        let media = this.listMedia()
        if (media.length == 1) return media[0]
        let hasLeft = this.elem.querySelector(ContainerLeftBtn)
        let hasRight = this.elem.querySelector(ContainerRightBtn)
        if (hasLeft && hasRight) {
            return media[1]
        }
        if (hasLeft) return media.pop()
        return media[0]
    }


    inject() {
        this.buttonBar().append(this.downloadButton())
        this.elem.classList.add("isg")
    }

}


const releaseTheKraken = () => {
    let nodeList = document.querySelectorAll(`${ContainerArticle}:not(.isg)`)
    nodeList.forEach(node => {
        new Downloader(node).inject()
    })
}


const doc = document.querySelector('.cGcGK')

const observer = new ResizeObserver(() => {
    releaseTheKraken()
})

observer.observe(doc)