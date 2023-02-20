function pdfWithPageBreak(selectorCSS, limitPage, quantOfTagBr, tag) {
    if (limitPage < 1 || typeof limitPage != 'number') { console.log('err-001: limitePage tem que ser maior que 0. Lembre-se que é uma medida em px. ( Ponha apenas os números )'); return false }

    if (typeof selectorCSS != 'string') { console.log('err-002: O parametro selectorCSS deve conter uma string que será usada pela função querySelectorAll, logo, deve-se usar um valor aceitável por essa função.(use os mesmos que usaria para referenciar em um arquivo.css).'); return false }

    if (!new RegExp(/([a-z]|\.|#|\*)/img).test(selectorCSS[0])) { console.log('err-003: Primeiro caractere do seletor css inválido.'); return false }

    if (!!quantOfTagBr && typeof quantOfTagBr != 'number' || quantOfTagBr < 1) { console.log('err-004: quantOfTagBr recebeu um valor inválido. É um parâmetro opcional, no qual só aceita um número entre 0 e +infinito.'); return false }

    if (!selectorCSS || !limitPage) { console.log("err-005: Tem um parâmetro obrigatório vazio ou com valor booleano falso (que nem tua filha). "); return false }

    limitPage = Number.parseInt(limitPage)
    quantOfTagBr = !quantOfTagBr ? 3 : Number.parseInt(quantOfTagBr)

    let ArraytagsBr = []
    for (let i = 0; i < quantOfTagBr; i++) ArraytagsBr.push(tag ? tag : 'br')

    let initialHTML = document.querySelector(selectorCSS)
    const arrayWithTagsChildren = Array.from(initialHTML.children)

    // Fim da verificação dos dados recebido. Tenho todos os dados necessário e com a tipagem certa para começar.

    try {
        let currentHeightOfThisGroup = 0
        for (let indice = 0; indice < arrayWithTagsChildren.length; indice++) {
            const heightOfThisElement = arrayWithTagsChildren[indice].clientHeight

            if (currentHeightOfThisGroup + heightOfThisElement >= limitPage) { ArraytagsBr.forEach(tag => arrayWithTagsChildren.splice(indice, 0, document.createElement(tag))); currentHeightOfThisGroup = 0 }
            else currentHeightOfThisGroup += heightOfThisElement
        }

        initialHTML.innerHTML = ''
        arrayWithTagsChildren.forEach(element => initialHTML.appendChild(element))

        return arrayWithTagsChildren

    } catch (err) { console.log('err-006: '+ err) }

}
console.log('Funcionou?', pdfWithPageBreak('tbody', 2480) ? 'SIM' : 'NÃO')
