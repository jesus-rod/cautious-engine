'use client'
import {signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await signOut({redirect: false, callbackUrl: "/"})
    router.push(result.url)
  }
  return (
    <button
      onClick={handleLogout}
      className={`text-zinc-400 dark:text-zinc-500 transition py-2 px-4
        text-zinc-900 dark:text-zinc-100"
        "hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
    >
      Log out
    </button>
  )
}

export default LogoutButton