/* eslint-disable */
export default function inputOnlyNums(value) {
  value = value.toString()
  if (value.length < 1) return;

  const nums  = /\d+/;

  let  purifyedValue = Number((value).match(nums))

  if(purifyedValue !== 0){
    if (value > 99){
      return 99
    } else {
      return purifyedValue
    }
  }
}
