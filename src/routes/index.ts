import { Router } from 'express';
import { currentUser, errorHandler } from 'middlewares';
import { NotFoundError } from 'libs/errors';
import { router as apis } from './api';

const router = Router();

router.use(currentUser);
router.use(`/${process.env.BASE_API_URL}`, apis);

router.use('*', async () => {
    throw new NotFoundError();
});

router.use(errorHandler);

export default router;
