import { Router, Request, Response } from 'express'

const router = Router()

router.get('/user', async (req: Request, res: Response) => {
    res.status(200).json({ success: true })
})

export { router }
