import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
const Input = ({
  type,
  errorMessage,
  placeholder,
  className,
  classNameInput = 'w-full rounded-sm border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  name,
  register,
  rules,
  autoComplete
}: Props) => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        {...registerResult}
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
