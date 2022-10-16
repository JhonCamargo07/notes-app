const { Router } = require('express');

const router = Router();

const { renderSignInForm, renderSignUpForm, SignUp, logout, signIn } = require('./../controllers/users.controller');

// SignUp
router.get('/signup', renderSignUpForm);
router.post('/signup', SignUp);

// SignIn
router.get('/signin', renderSignInForm);
router.post('/signin', signIn);

router.get('/logout', logout);

module.exports = router;
