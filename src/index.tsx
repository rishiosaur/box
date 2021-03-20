import {h} from "snabbdom/build/package/h"
import { VNode } from 'snabbdom/build/package/vnode'
import { init } from 'snabbdom/build/package/init'
import {propsModule} from 'snabbdom/build/package/modules/props'

const createElement = (type: any, props: Record<string, unknown> = {}, ...children: VNode[] ) => {
console.log(type)

    if (type.prototype && type.prototype.__isBoxClassComponent) {
         const instance = new type(props)
        return instance.render()
    }

    if (typeof type === "function") {
        return type(props)
    }

    return h(type, {props}, children.flat())
}

 class Component<Props, State> {
    state: State
    props: Props
     __isBoxClassComponent: boolean;


    constructor(props: Props & { children: VNode } ){
        this.props = props
    }

    componentDidMount() {}

    setState(partialState: Partial<State>) {}

    render() {}
}

Component.prototype.__isBoxClassComponent = true;

const Box = { createElement, Component }

const reconcile = init([propsModule])

const render = (element: VNode, root: VNode | Element) => {
    reconcile(root, element)
}

const BoxDOM = { render }

const Hello = ({ name }) => <p>Greetings, {name}</p>

class Count extends Box.Component<{initial: number}, {count: number}> {
    constructor(props) {
        super(props);
        this.setState({ count: this.props.initial })
    }

    componentDidMount() {
        console.log("mounted")
    }

    render() {
        return (
            <div>
                <p>Current count: {this.state.count}</p>
            </div>
        )
    }

}

const App = (
    <div>
        {['h', 'm'].map((z,i)=> <p key={i}>Makin' makin' makin {z} stuff with React!</p>)}

        <br/>

        <Hello name={"hi"}/>

        <Count initial={3}/>

    </div>
);


BoxDOM.render(App as unknown as VNode, document.getElementById("root"))
