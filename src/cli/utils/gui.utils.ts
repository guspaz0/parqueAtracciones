export const CenterText = (tableLength: number, titulo: string) => {
    let padStart = titulo.slice(0,titulo.length/2).padStart(tableLength/2)
    let padEnd = titulo.slice(titulo.length/2).padEnd(tableLength/2)
    return padStart+padEnd
}

export const BuildMenu = (title: string, options: Map<string, string | number>) => {
    console.clear()
    const titulo = CenterText(70,title)
    console.log(`
        \r┌${"─".repeat(70)}┐
        \r│${titulo}│
        \r├${"─".repeat(70)}┤`)
    Array.from(options.entries()).forEach(([key,value],i)=> {
        let optionId = (i+1).toString().padEnd(1);
        let optionKey = key.padEnd(value? 30 : 66)
        let opcionValue = value ? value.toString().padEnd(36) : ""
        console.log(`\r│${optionId}. ${optionKey} ${opcionValue}│`)
    })
    console.log(`\r└${"─".repeat(70)}┘`)
}
