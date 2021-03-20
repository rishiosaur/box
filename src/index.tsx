import {h} from "snabbdom/build/package/h"
import { VNode } from 'snabbdom/build/package/vnode'
import { init } from 'snabbdom/build/package/init'
import {propsModule} from 'snabbdom/build/package/modules/props'

const createElement = (type: string, props: Record<string, unknown> = {}, ...children: VNode[] ) => {
    console.log(type, props, children);
    return h(type, {props}, children)
}

const Box = { createElement }

const reconcile = init([propsModule])

const render = (element: VNode, root: VNode | Element) => {
    reconcile(root, element)
}

const BoxDOM = { render }

const App = (
    <div>
        <p>Makin' makin' makin cool stuff with React!</p>
    </div>
);


BoxDOM.render(App as unknown as VNode, document.getElementById("root"))
