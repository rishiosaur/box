import {h} from "snabbdom/build/package/h"
import { VNode } from 'snabbdom/build/package/vnode'

const createElement = (type: string, props: Record<string, unknown> = {}, ...children: VNode[] ) => {
    console.log(type, props, children);
    return h(type, {props}, children)
}

const Box = { createElement }

const App = (
    <div>
        <p>Makin' makin' makin cool stuff with React!</p>
    </div>
);
