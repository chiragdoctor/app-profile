import isEmpty from "./isEmpty"
import Validator from "validator";


export default function validateRegisterInput(data) {
  let errors = {}
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
  data.password = !isEmpty(data.password) ? data.password : '';    
  data.email = !isEmpty(data.email) ? data.email : '';
  data.confirmPass = !isEmpty(data.confirmPass) ? data.confirmPass : '';

  if (!Validator.isLength(data.firstName,{min: 3, max: 30})) {
    errors.firstName = 'First name must be between 3 and 30 characters'
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required'
  }
  if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last name field is required';
  }
  if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email Should be in proper formate"
  }
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = 'Mobile number is required '
  }
  if (!Validator.isNumeric.isLength(data.mobile,{min:10,max:13})) {
    errors.mobile= 'Mobile should be in number'
  }
  if (Validator.isEmpty(data.confirmPass)) {
		errors.confirmPass = 'Confirm Password Field is Required';
	}
	if (!Validator.equals(data.password, data.confirmPass)) {
		errors.confirmPass = ' Password must match';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  }

};
