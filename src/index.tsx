import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import App from 'App'

import { store } from 'store/store'
import reportWebVitals from 'reportWebVitals'
import { firebaseConfig } from 'config/config'

import 'index.css'

initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
