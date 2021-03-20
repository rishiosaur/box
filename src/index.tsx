import {h} from "snabbdom/build/package/h"
import { VNode } from 'snabbdom/build/package/vnode'
import { init } from 'snabbdom/build/package/init'
import {propsModule} from 'snabbdom/build/package/modules/props'

const createElement = (type: string, props: Record<string, unknown> = {}, ...children: VNode[] ) => {
    return h(type, {props}, children.flat())
}

const Box = { createElement }

const reconcile = init([propsModule])

const render = (element: VNode, root: VNode | Element) => {
    reconcile(root, element)
}

const BoxDOM = { render }

const App = (
    <div>
        {['h', 'm'].map(z => <p>Makin' makin' makin {z} stuff with React!</p>)}
    </div>
);


BoxDOM.render(App as unknown as VNode, document.getElementById("root"))
