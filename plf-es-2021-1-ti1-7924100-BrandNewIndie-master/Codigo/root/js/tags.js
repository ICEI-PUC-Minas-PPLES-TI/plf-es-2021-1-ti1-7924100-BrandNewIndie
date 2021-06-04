import tagsData from './tag_data.js'

const tags = document.querySelector('.tags')

function createTags(data) { // cria uma tag baseado nos dados tirados do parâmetro
    const tag = document.createElement('div')
    tag.className = 'col-3 form-check'
tag.innerHTML = `<input class="form-check-input" type="checkbox" value="" id="${data}" onclick="checkTag('${data}')" checked>
    <label class="form-check-label" for="${data}">${data}</label>`
    tags.appendChild(tag)    
}

for (let i = 0; i < tagsData.length; i++) {
    createTags(tagsData[i])
}