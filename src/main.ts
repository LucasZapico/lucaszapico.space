// import { followEl } from './followCard.ts'
import './style.scss'
import { svgTree } from './tree.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1 class="display noselect" >LucasZapico.Space</h1>
    <main>
    <div id="bg"></div>
    <div id="tree" class="card-warpper"></div>
    <div>
    <a href="https://dev.lucaszapico.space" target="_blank"><span>--></span> Dev.LucasZapico.Space</a>
    </div>
    </main>
`

svgTree(document.querySelector<HTMLDivElement>('#tree')!)
// followEl(document.querySelector<HTMLDivElement>('.card')!)

