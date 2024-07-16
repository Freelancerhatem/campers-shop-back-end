import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import productRoutes from './models/Product/product.routes'
import cartRoutes from './models/Cart/cart.route'
const app: Application = express()



//parser
app.use(express.json())
app.use(cors())
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app