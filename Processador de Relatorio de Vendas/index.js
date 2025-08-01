const fs = require('fs').promises
const path = require('path')

async function convertFile(filePath) {
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
        }).filter(item => item!==null)
        console.log(prodArr)
        return prodArr
        
    } catch (error) {

    }

}
async function totalSales(){
    const data = await convertFile("vendas.csv")
    const total = data.reduce((acc, item)=> acc +(item.Quantidade * item.PrecoUnitario),0)
    return total
}
convertFile("vendas.csv").then(res=>{
    console.log(res)
})
totalValue().then(res=>console.log(res))