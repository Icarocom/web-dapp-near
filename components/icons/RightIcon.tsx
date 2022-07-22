import * as React from 'react';

export const RightIcon = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<'svg'>>((props, ref) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      ref={ref}
      {...props}
    >
      <path d="M4.5 9L7.5 6L4.5 3" stroke="#8383A5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

RightIcon.displayName = 'RightIcon';
