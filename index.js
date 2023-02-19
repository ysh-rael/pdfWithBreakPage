function pdfWithPageBreak(selectorCSS, limitPage, quantOfTagBr) {
    if (!selectorCSS || !limitPage) { console.log("Sou bem vidente para adivinhar o que você quer e onde você quer! Tem um parâmetro vazio ou com valor booleano falso (que nem tua filha). "); return false }

    if (limitPage < 0.9 || typeof limitPage != 'number') { console.log('err-001: Porra, na moral, me ajude a lhe ajudar... PÕE A DROGA DOS PARÂMETROS DIREITO SEU ANIMAL!!! limitePage tem que ser maior que 0. Lembre-se que é uma medida em px. ( Ponha apenas os números, não venha com uma fuckin* string não seu bosta. )'); return false }

    if (typeof selectorCSS != 'string') { console.log('err-002: Meu nobre guerreiro espartano... O nome do primeiro parametro é autodescritivo. Você usaria isso como seletor no css? não, né, SEU ARROMBADO! O parametro selectorCSS deve conter uma string que será usada pela função querySelectorAll, logo, deve-se usar um valor aceitável por essa função.(use os mesmos que usaria para referenciar em um arquivo.css).'); return false }

    if (!new RegExp(/([a-z]|\.|#|\*)/img).test(selectorCSS[0])) { console.log('err-003: Meu camarada, tua mãe nasceu pelada, foi? Você começou errado o seletor css. Dá uma olhada nisso ai.'); return false }

    if (!!quantOfTagBr && typeof quantOfTagBr != 'number' || quantOfTagBr < 1) { console.log('err-004: O négocio é o seguinte menó: Você tem que presta atenção nos parâmetros. quantOfTagBr recebeu um valor inválido. É um parâmetro opcional, no qual só aceita um número entre 0 e +infinito. Facilite meu trabalho, ponha um número inteiro.'); return false }

    limitPage = Number.parseInt(limitPage)
    quantOfTagBr = !quantOfTagBr ? 2 : Number.parseInt(quantOfTagBr)

    let ArraytagsBr = []
    for (let i = 0; i < quantOfTagBr; i++) ArraytagsBr.push('')

    // Fim da verificação dos dados recebido. Tenho todos os dados necessário e com a tipagem certa par começar.

    const initialHTML = document.querySelector(selectorCSS)

    let currentHeight = 0
    let arrayWhiteTagsChildren = Array.from(initialHTML.children)

    arrayWhiteTagsChildren.reduce( (prev, current, indice) => {
        if (prev + current.clientHeight >= limitPage) {
            ArraytagsBr.forEach(tag => arrayWhiteTagsChildren.splice(indice, 0, document.createElement('br')))
            current.style.color = 'red'
            return prev = 0
        }
        return prev += current.clientHeight
    }, 0)
    console.log(arrayWhiteTagsChildren.length)

    initialHTML.innerHTML = ''
    arrayWhiteTagsChildren.forEach(element => {
        console.log(element)
        initialHTML.append(element)
    })



    return true
}

console.log('Funcionou?', pdfWithPageBreak('tbody', 200) ? 'SIM' : 'NÃO')
