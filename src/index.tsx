import {h} from "snabbdom/build/package/h"
import { VNode } from 'snabbdom/build/package/vnode'
import { init } from 'snabbdom/build/package/init'
import {propsModule} from 'snabbdom/build/package/modules/props'

const createElement = (type: string | Function, props: Record<string, unknown> = {}, ...children: VNode[] ) => {

    if (typeof type === "function") {
        return type(props)
    }

    return h(type, {props}, children.flat())
}

const Box = { createElement }

const reconcile = init([propsModule])

const render = (element: VNode, root: VNode | Element) => {
    reconcile(root, element)
}

const BoxDOM = { render }

const Hello = ({ name }) => <p>Greetings, {name}</p>

const App = (
    <div>
        {['h', 'm'].map((z,i)=> <p key={i}>Makin' makin' makin {z} stuff with React!</p>)}

        <br/>

        <Hello name={"hi"}/>

    </div>
);


BoxDOM.render(App as unknown as VNode, document.getElementById("root"))
