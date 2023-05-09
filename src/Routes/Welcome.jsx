import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { currentToken, currentUser } from "../features/auth/authSlice";

const Welcome = () => {
  const user = useSelector(currentUser);
  const token = useSelector(currentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        <Link to="/userslist">Go to the Users List</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
