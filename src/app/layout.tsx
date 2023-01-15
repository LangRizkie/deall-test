import { Children } from '@/modules/types.module'
import Providers from './providers'

const RootLayout: React.FC<Children> = ({ children }) => {
  return (
    <html lang='en'>
      <head />
      <body>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
