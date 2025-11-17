import { auth0 } from "@/lib/auth0";
import LoggedOutHome from "../modules/home/homeLoggout/LoggedOutHome";
import Main from "@/modules/home/homeLogin/Main";
export default async function App() {
  const session = await auth0.getSession();
  const user = session?.user;
  
  return (
        <div>
          {user ? (
            <Main />
          ) : (
            <LoggedOutHome />
          )}
        </div>
  );
}
