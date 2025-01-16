import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <svg
        className={styles.mark}
        fill="none"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Define a 45-degree stripe pattern for the outer ring */}
        <defs>
          <pattern
            id="stripePattern"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
            patternTransform="rotate(45)"
          >
            {/* Adjust fill or rect width to modify stripe color/thickness */}
            <rect x="0" y="0" width="2" height="4" fill="#888" />
          </pattern>
        </defs>

        {/* Rotate the entire design 45 degrees around the center (16,16) */}
        <g transform="rotate(45 16 16)">
          {/* 
            1. Outer ring (octagonal + negative space) 
               filled with diagonal stripes.
               fillRule="evenodd" subtracts the inner octagon 
               from the outer polygon, leaving a ring.
          */}
          <path
            fill="url(#stripePattern)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="
              M16 2 
              L26 10 
              L30 16 
              L26 22 
              L16 30 
              L6 22 
              L2 16 
              L6 10 
              Z

              M16 7
              L10 12
              L8 16
              L10 20
              L16 25
              L22 20
              L24 16
              L22 12
              Z
            "
          />

          {/* 
            2. Central star (solid color, no stripes),
               symbolizing the “hidden core” or key insight.
          */}
          <path
            fill="currentColor"
            d="
              M16 12
              L18 14
              L20 16
              L18 18
              L16 20
              L14 18
              L12 16
              L14 14
              Z
            "
          />
        </g>
      </svg>
      <span className={styles.wordmark}>Beacon</span>
    </div>
  );
}
