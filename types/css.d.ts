// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as CSS from 'csstype'

declare module 'csstype' {
  
  interface Properties {
    textAlign?: string
    textTransform?: string
  }
}