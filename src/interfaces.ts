export interface Property {
    value: any,
    type: string
}

export interface Properties {
    [name: string] : Property
}


export interface PropertyXML {
    "$": {name: string},
    _?: string
}

export interface PropertiesXML {
    [name: string] : PropertyXML[]
}

export interface InstanceXML {
    "$": {class: string,referent: string},
    Properties: [
        PropertiesXML
    ],
    Item: InstanceXML[]
}