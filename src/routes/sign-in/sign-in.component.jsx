import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

export default function SingIn()
{
  const logGoogleUser = async () => 
  {
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}> Sign in with Google </button>

      <SignUpForm />
    </div>
  )
}