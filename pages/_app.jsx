import { Provider } from 'mobx-react'
import { createStore } from '@/stores/AppStore'
import ThemeProvider from '@/stores/providers/ThemeProvider'

const store = createStore()

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp