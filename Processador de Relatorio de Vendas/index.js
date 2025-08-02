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

async function totalSales() {
    const data = await convertFile("vendas.csv")
    const total = data.reduce((acc, item) => acc + (item.Quantidade * item.PrecoUnitario), 0)
    return total
}
async function getCompletedSales(){
    const data = await convertFile("vendas.csv")
    const completedSales = data.filter((item)=> item.Status.toLowerCase() === "concluída")
    return completedSales

}
// convertFile("vendas.csv").then(res => {
//     console.log(res)
// })
totalSales().then(res => console.log(res))
getCompletedSales().then(res=>console.log(res))