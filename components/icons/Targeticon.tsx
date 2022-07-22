import * as React from 'react';

export const TargetIcon = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<'svg'>>((props, ref) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      ref={ref}
      {...props}
    >
      <path
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        stroke="#F771A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 11H17" stroke="#F771A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 11H1" stroke="#F771A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 5V1" stroke="#F771A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 21V17" stroke="#F771A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

TargetIcon.displayName = 'TargetIcon';
