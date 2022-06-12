import Start, { App, startAppOnly } from './src/app'

// Since DB isn't ready, only start app without mongoose connection
//startAppOnly()
Start()

