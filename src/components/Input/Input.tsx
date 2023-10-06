import type {UseFormRegister , RegisterOptions} from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string,
  placeholder?: string,
  className?: string,
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions,
  autoComplete?: string
}
const Input = ({type, errorMessage, placeholder, className, name, register, rules , autoComplete}: Props) => {
  return (
    <div className={className}>
    <input
      {...register(name, rules)}
      type= {type}
      className='w-full rounded-sm border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
      placeholder ={placeholder}
      autoComplete={autoComplete}
    />
    <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errorMessage}</div>
  </div>
  );
};

export default Input;