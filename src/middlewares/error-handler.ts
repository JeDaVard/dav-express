import { Request, Response, NextFunction } from 'express'
import { CustomError } from 'libs/errors/error-interfaces'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.code).send({ errors: err.serialize() })
        return
    }

    console.error(err)
    res.status(500).send({
        errors: [{ message: 'Something went wrong!' }],
    })
}
