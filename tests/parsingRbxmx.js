const {RobloxXMLParser} = require("roblox-xml-parser")
const fs = require("fs")


async function editFile(file) {
    const parsed = new RobloxXMLParser
    await parsed.parse(await fs.promises.readFile(file,"utf-8"))
    parsed.dataModel.children.find(children=>children.properties.Name.value=="Part").properties.Name.value="ggg"
    console.log(parsed.convertToXML())
}

editFile("tests/Part.rbxmx")