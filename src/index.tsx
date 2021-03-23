import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import { init } from 'snabbdom/build/package/init'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { JSX_TYPES } from '@babel/types'

const createElement = (
	type: any,
	props: Record<string, unknown> = {},
	...children: VNode[]
) => {
	console.log(type)

	if (type.prototype && type.prototype.__isBoxClassComponent) {
		const instance = new type(props)

		instance.__node = instance.render()
		instance.__node.data.hook = {
			create: () => {
				instance.componentDidMount()
			},
		}
		return instance.__node
	}

	if (typeof type === 'function') {
		const instance = type

		type.__node = type(props)

		return instance.__node
	}

	const dataProps = {}
	const eventProps = {}

	for (const key in props) {
		if (key.startsWith('on')) {
			const event = key.substring(2).toLowerCase()
			eventProps[event] = props[key]
		} else {
			dataProps[key] = props[key]
		}
	}

	return h(type, { props: dataProps, on: eventProps }, children.flat())
}

class Component<Props, State> {
	state: State
	props: Props
	__isBoxClassComponent: boolean
	__node: VNode

	constructor(props: Props) {
		this.props = props
	}

	componentDidMount() {}

	setState(partialState: Partial<State>) {
		this.state = {
			...this.state,
			...partialState,
		}

		Box.__update(this)
	}

	render() {}
}

Component.prototype.__isBoxClassComponent = true

const Box = {
	createElement,
	Component,
	__update: (component: { __node: VNode }) => {
		const old = component.__node
		if (component instanceof Component) {
			const newNode: any = component.render()
			component.__node = reconcile(old, newNode)
		}
	},
}

const reconcile = init([propsModule, eventListenersModule])

const render = (element: VNode, root: VNode | Element) => {
	reconcile(root, element)
}

const BoxDOM = { render }

class TodoInput extends Component<
	{ onSubmit: (todo: string) => void },
	{ value: string }
> {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
		}
	}

	render() {
		return (
			<div>
				<input
					onChange={(e) => {
						this.setState({ value: e.target.value })
					}}
					value={this.state.value}
				/>
				<button
					onClick={() => {
						this.props.onSubmit(this.state.value)
						this.setState({ value: '' })
					}}>
					Add
				</button>
			</div>
		)
	}
}

interface Todo {
	title: string
	completed: boolean
}

// @ts-ignore
class Todos extends Component<{}, { todos: Todo[] }> {
	constructor(props) {
		super(props)
		this.state = {
			todos: [],
		}
	}

	onSubmit = (todo) => {
		this.setState({
			todos: this.state.todos.concat({ title: todo, completed: false }),
		})
	}

	render() {
		return (
			<div>
				{this.state.todos.map((todo, id) => {
					return (
						<p
							onClick={() => {
								const value = todo
								this.setState({
									todos: this.state.todos.filter(
										(z) => z !== value
									),
								})
							}}>
							{todo.title}
						</p>
					)
				})}
				<TodoInput onSubmit={this.onSubmit} />
			</div>
		)
	}
}

const App = <Todos />

BoxDOM.render(App as any, document.getElementById('root'))
