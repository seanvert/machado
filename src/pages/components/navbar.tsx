import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
const NavBar = () => {
    return (
        <AuthShowcase />
    )
}

function AuthShowcase() {
    const { data: sessionData } = useSession();
  
    const { data: secretMessage } = api.post.getSecretMessage.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined }
    );
  
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl bg-slate-200">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
        <button
          className="rounded-full bg-blue-800 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-600"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }

  export default NavBar;