import * as React from 'react';
import clsx from 'clsx';

interface Props {
  label: string;
  value: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const TextEdit: React.FC<Props> = ({ label, value, className, onChange }) => {
  return (
    <div className="relative z-0">
      <textarea
        id={'textarea_element' + label}
        name={'textarea_element' + label}
        className={clsx(
          'peer w-full pt-6 pb-2 pl-4 pr-4 text-body-md placeholder-gray-500 border border-darkGrey rounded-lg appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
          className ? className : ''
        )}
        placeholder=" "
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        required
      />
      <label
        htmlFor={'textarea_element' + label}
        className="text-darkGrey absolute top-[9px] left-[17px] text-body-sm peer-focus:text-body-sm peer-focus:top-[9px] peer-placeholder-shown:text-body-md peer-placeholder-shown:top-[18px]  transition-all ease-linear delay-200"
      >
        {label}
      </label>
    </div>
  );
};
