import {h} from "snabbdom/build/package/h"
import { VNode } from 'snabbdom/build/package/vnode'
import { init } from 'snabbdom/build/package/init'
import {propsModule} from 'snabbdom/build/package/modules/props'
import {eventListenersModule} from "snabbdom/build/package/modules/eventlisteners";

const createElement = (type: any, props: Record<string, unknown> = {}, ...children: VNode[] ) => {
console.log(type)

    if (type.prototype && type.prototype.__isBoxClassComponent) {
        const instance = new type(props)
        instance.__node = instance.render()
        instance.__node.data.hook = {
            create: () => {
                instance.componentDidMount()
            }
        }
        return instance.__node
    }

    if (typeof type === "function") {
        return type(props)
    }

    const dataProps = {}
    const eventProps = {}

    for (const key in props) {
        if (key.startsWith("on")) {
            const event = key.substring(2).toLowerCase();
            eventProps[event] = props[key]
        } else {
            dataProps[key] = props[key]
        }
    }




    return  h(type, {props: dataProps, on: eventProps}, children.flat())

}

 class Component<Props, State> {
    state: State
    props: Props
     __isBoxClassComponent: boolean;
    __node: VNode;
     static __isBoxClassComponent: boolean;

    constructor(props: Props){
        this.props = props
    }

    componentDidMount() {}

    setState(partialState: Partial<State>) {
        this.state = {
            ...this.state,
            ...partialState
        }

        Box.__update(this)
    }

    render() {}
}

Component.prototype.__isBoxClassComponent = true

const Box = { createElement, Component,
    __update: (component: { __node: VNode }) => {
        const old = component.__node;
        if (component instanceof Component) {
            const newNode: any = component.render()
            component.__node = reconcile(old, newNode);
        }
    }
}

const reconcile = init([propsModule, eventListenersModule])

const render = (element: VNode, root: VNode | Element) => {
    reconcile(root, element)
}

const BoxDOM = { render }

const Hello = ({ name }) => <p>Greetings, {name}</p>

class Count extends Box.Component<{initial: number}, {count: number}> {
    constructor(props: any) {
        super(props);
        this.state = { count: props.initial }
        setInterval(() => {
            this.setState({
                count: this.state.count + 1
            })
        }, 1000);
    }

    componentDidMount() {
        console.log("mounted")
    }

    render() {
        // return (
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Hello</button>

            </div>)
        // )
    }

}

// @ts-ignore
const App = (
    <div>
        {['h', 'm'].map((z,i)=> <p key={i}>Makin' makin' makin {z} stuff with React!</p>)}

        <br/>

        <Hello name={"hi"}/>

        <Count initial={3}/>

    </div>
);


BoxDOM.render(App as unknown as VNode, document.getElementById("root"))
