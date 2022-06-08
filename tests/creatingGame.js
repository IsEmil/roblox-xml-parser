const {RobloxXMLParser,Instance} = require("roblox-xml-parser")
const fs = require("fs")

const edited = new RobloxXMLParser

const Workspace = new Instance("Workspace",edited.dataModel)

const brick = new Instance("Part",Workspace)
brick.properties.Size={value:{X:4,Y:4,Z:4},type: "Vector3"}

fs.writeFile("game.rbxlx", edited.convertToXML(), (err) => {
    if (err) throw err;
    
    console.log("The file was succesfully saved!");
}); 