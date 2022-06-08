import {parseInstance,convertInstance} from './parser'
import {Instance} from './classes'
import { Properties,Property } from './interfaces';
import {parseStringPromise, Builder} from 'xml2js';

export {Instance,Property,Properties}

export class RobloxXMLParser {
    dataModel: Instance;

    async parse(xmlContent: string) {
        const parsed = await parseStringPromise(xmlContent)
        for (let i in parsed.roblox.Item) {
            parseInstance(parsed.roblox.Item[i]).setParent(this.dataModel)
        }
    }

    convertToXML() : string {
        const builder = new Builder()
        let base: any = {roblox: {["$"]:{version:"4"},Item: []}}
        this.dataModel.children.forEach(element => {
            base.roblox.Item.push(convertInstance(element))
        });
        return builder.buildObject(base).replaceAll("&#xD;","").replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n',"")
    }

    constructor() {
        this.dataModel = new Instance("DataModel")
        this.dataModel.properties={}
    }
}