import { Router } from 'express';
import { userController } from 'controllers';
import { validateRequest } from 'middlewares';
import { body } from 'express-validator';

const router = Router();

router.get('/me', userController.currentUser);

router.post(
    '/sign-in',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('Password must be provided'),
    ],
    validateRequest,
    userController.signIn,
);
router.post(
    '/sign-up',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('You must provide 4-20 character password'),
    ],
    validateRequest,
    userController.signUp,
);
router.post('/sign-out', userController.signOut);

export { router };
