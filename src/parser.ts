import {parseStringPromise, Builder} from 'xml2js';

import {Instance} from "./classes"
import {Properties, PropertiesXML, PropertyXML,InstanceXML} from "./interfaces";


export function convertProperties(properties: Properties) : PropertiesXML {
    let grouped: PropertiesXML = {}
    for (let name in properties) {
        const {value,type} = properties[name]

        
        if (!grouped[type]) {
            // create category if list doesn't exists
            grouped[type]=[]
        }


        let property: any = {"$": {name: name}}
        if (typeof value == "object") {
            property=Object.assign({},property,value) // merge
            grouped[type].push(property)
        } else if (value) {
            // set value on xml
            property._=value.toString()
            grouped[type].push(property)
        }
        

    }
    return grouped
}




export function parseProperties(properties: PropertiesXML) : Properties {
    let parsed: Properties = {}
    for (let type in properties) {
        const props: PropertyXML[] = properties[type]

        for (let i in props) {
            const property: PropertyXML = props[i]
            const name = property["$"].name
            let value: any = property._

            if (!value && Object.keys(property).length>1) {
                value={}
                let values: any = property
                delete values["$"]
                
                for (let key in values) {
                    const val = values[key][0]
                    if (val) {
                        value[key]=val
                    }
                }
            }

            parsed[name]={value:value,type:type}
        }

    }
    return parsed
}

// parse and convert instance back to xml functions:

/* Used to parse properties into an easier structure */
export function parseInstance(instance: {[name:string]:any}) : Instance {
    const {class:className,referent} = instance["$"]
    const result = new Instance(className)

    result.properties=parseProperties(instance.Properties[0])
    result.referent=referent
    if (instance.Item) {
        for (let i in instance.Item) {
            parseInstance(instance.Item[i]).setParent(result)
        }
    }
    return result
}

export function convertInstance(instance: Instance) : InstanceXML {
    let converted: InstanceXML = {["$"]: {"class": instance.class,"referent": instance.referent},Properties:[convertProperties(instance.properties)],Item:[]}
    instance.children.forEach(element => {
        converted.Item.push(convertInstance(element))
    });
    return converted
}