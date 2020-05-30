import { body, validationResult } from "express-validator"

const registerRules = () => {
  return [
		body('mobile').isNumeric().isLength({min:10,max:13}).withMessage('Provide mobile number in +911234567890'),
		body('password','It should be provided').notEmpty().isLength({min:6,max:30}),
		body('confirmPass', 'Confirm Password is required').notEmpty().isLength({min:6,max:30}),
		body('firstName').isLength({ min: 3, max: 30 }).withMessage('First name is required'),
		body('lastName').isLength({ min: 3, max: 30 }).withMessage('First name is required'),
		body('email',"Give email").notEmpty().isEmail().withMessage('Please provide email in proper formate')
	]; 
}

const validate = (req, res, next) => {
  const errors =  validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.json({
    errors: extractedErrors
  })
}

export default { registerRules, validate}