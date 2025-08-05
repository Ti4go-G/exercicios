const fs = require('fs').promises
const path = require('path')

let cachedData = null
async function convertFile(filePath) {
    if (cachedData) return cachedData
    try {

        const fileContent = await fs.readFile(filePath, "utf-8")
        const data = fileContent.split(/\r?\n/)
        const [header, ...lines] = data;
        const keys = header.split(',')

        const prodArr = lines.map(line => {
            if (!line) return null
            const values = line.split(',')
            const product = Object.fromEntries(keys.map((key, index) => [key, values[index]]))

            product.ID = parseInt(product.ID);
            product.Quantidade = parseInt(product.Quantidade) || 0;
            product.PrecoUnitario = parseFloat(product.PrecoUnitario) || 0.0;
            return product
        }).filter(item => item !== null)
        // console.log(prodArr)
        cachedData = prodArr
        return cachedData

    } catch (error) {

    }

}

async function getTotalSales() {
    const data = await convertFile("vendas.csv")
    const total = data.reduce((acc, item) => acc + (item.Quantidade * item.PrecoUnitario), 0)
    return total
}
async function getCompletedSales() {
    const data = await convertFile("vendas.csv")
    const completedSales = data.filter((item) => item.Status.toLowerCase() === "concluída")
    return completedSales

}
async function getTotalCompleted() {
    const data = await getCompletedSales()
    const total = data.reduce((acc, item) => acc + (item.Quantidade * item.PrecoUnitario), 0)
    return total

}

async function getBestSelling() {

    const completedSales = await getCompletedSales()
    const prodBestSelling = completedSales.reduce((acc, item) => item.Quantidade > acc.Quantidade ? item : acc, completedSales[0]);

    return prodBestSelling;
}


async function saveFile(fileName, content) {
    try {
        await fs.writeFile(fileName, content, 'utf-8');
        console.log('Arquivo salvo com sucesso!');
    } catch (err) {
        console.error('Erro ao salvar:', err);
    }
}

async function createReport() {
    const now = new Date()
    const fileName = 'relatorio.txt'
    const dataFormatada = now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    const pathFolder = path.resolve(__dirname)
    const totalSales = await getTotalSales()
    const completedSales = await getTotalCompleted()
    const bestSelling = await getBestSelling()
    const content = `
=====================================
  RELATÓRIO DE VENDAS CONSOLIDADO
=====================================

Data de Geração: ${dataFormatada}

--- RESUMO GERAL ---

- Valor Total Bruto: R$ ${totalSales.toFixed(2).replace('.', ',')}
- Valor Total Líquido (Vendas Concluídas): R$ ${completedSales.toFixed(2).replace('.', ',')}

--- DESTAQUES ---

- Produto Mais Vendido (em quantidade): ${bestSelling.Produto}
- Unidades Vendidas do Produto Destaque: ${bestSelling.Quantidade}

-------------------------------------
  Relatório gerado automaticamente.
-------------------------------------`
    saveFile(fileName, content)
    saveData()


}

async function saveData(){
    const data = await getCompletedSales()
    const fileName = 'vendas_concluidas.json'
    const productJson = JSON.stringify(data, null, 2)
    await fs.writeFile(fileName, productJson)
}
createReport()