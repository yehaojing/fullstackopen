import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const actionDispatcher = (action) => {
    return () => { store.dispatch({ type: action }) }
  }

  return (
    <div>
      <button onClick={actionDispatcher('GOOD')}>good</button>
      <button onClick={actionDispatcher('OK')}>ok</button>
      <button onClick={actionDispatcher('BAD')}>bad</button>
      <button onClick={actionDispatcher('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
