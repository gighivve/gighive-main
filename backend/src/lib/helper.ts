import { UserDataType } from "./types";

export function checkFields(data: UserDataType) {
  let mutiplefault = [];
  let emptykeys = [];
  let invalidkeys = [];

  //   used to validate the imputs from the user
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone = /^(\+234|0)[789][01]\d{8}$/;
  const stringInPhone = /^\d+$/;
  const password = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  // this checks for all empty keys or emptyinput
  for (const key in data) {
    if (data[key] === "") emptykeys.push(key);
  }
  // checking/validating the values and also updating the list of invalid inputs
  if (!email.test(data.email)) invalidkeys.push("email");
  if (!password.test(data.password)) invalidkeys.push("password");
  if (!phone.test(data.phone) && !stringInPhone.test(data.phone)) invalidkeys.push("phoneNumber");

  //   updating the list of errors
  if (!!(emptykeys.length > 0)) mutiplefault.push(`${emptykeys} can not be empty`);
  if (!!(invalidkeys.length > 0)) mutiplefault.push(`${invalidkeys} is invalid`);

  return `${mutiplefault.join(",")}`;
}
