import type { JSX } from "react/jsx-runtime";

interface WelcomeProps {
  name: string;
}

// the return type JSX.Element is redundant
// TypeScript compiler infers the type of the component automatically
export const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Welcome, {props.name}!</h1>;
};
