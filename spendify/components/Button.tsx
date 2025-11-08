
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, ...props }) => {
  const baseClasses = "px-8 py-3 rounded-full font-bold text-white transition-all duration-300 focus:outline-none focus:ring-4 flex items-center justify-center space-x-2";
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark focus:ring-green-300',
    secondary: 'bg-secondary hover:bg-blue-700 focus:ring-blue-300',
  };

  const disabledClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`} {...props} disabled={isLoading || props.disabled}>
       {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
