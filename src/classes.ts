import { Property } from "./interfaces";
import crypto = require("crypto")

export class Instance {
    referent: string;
    class: string;
    children: Instance[] = [];
    properties: {[name: string] : Property}
    parent?: Instance

    setParent(newParent: Instance) {
        const oldparent = this.parent
        if (oldparent) {
            oldparent.children = oldparent.children.filter(x=>x.referent!=this.referent)
        }
        this.parent=newParent
        newParent.children.push(this)
    }

    Clone() : Instance {
        const clone = new Instance(this.class)
        clone.properties=this.properties
        this.children.forEach(element => {
            element.Clone().setParent(clone)
        });
        return clone
    }

    getDescendants() : Instance[] {
        let descendants: Instance[] = []
        this.children.forEach(element => {
            descendants.push(element)
            element.getDescendants().forEach(element => {
                descendants.push(element)
            });
        });
        return descendants
    }

    constructor(className: string, parent?: Instance) {
        this.referent="RBX"+crypto.randomBytes(16).toString('hex').toUpperCase()
        this.class=className || "Part"
        this.properties={Name: {value:className,type:"string"}}
        if (parent) {
            this.setParent(parent)
        }
    }
}

