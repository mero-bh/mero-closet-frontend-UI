import { auth, signOut } from "auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default async function ProfilePage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/api/auth/signin")
    }

    const user = session.user

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold font-logo text-neutral-900 dark:text-white">my profile</h1>
                    <Link
                        href="/"
                        className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                        ← Back to Store
                    </Link>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-neutral-100 dark:border-neutral-800 shadow-inner relative">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "User"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl text-white font-bold">
                                        {user.name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left space-y-2 flex-1">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                {user.name}
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">
                                {user.email}
                            </p>
                            <div className="pt-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium border border-green-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Active Account
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">Customer ID</h3>
                            <p className="text-xs text-neutral-500 font-mono truncate">
                                {/* @ts-ignore */}
                                {user.id}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">Role</h3>
                            <p className="text-xs text-neutral-500 capitalize">
                                {/* @ts-ignore */}
                                {user.role || "Customer"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                    {/* Admin Panel Button - Only for admin emails */}
                    {user.email && [
                        "mmalromaihi99@gmail.com",
                        "bhmeromero@gmail.com",
                        "alromaihi2224@gmail.com"
                    ].includes(user.email.toLowerCase()) && (
                            <a
                                href="https://mero-closet-adb92a18a188.herokuapp.com/app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Admin Panel
                            </a>
                        )}

                    <form
                        action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/" })
                        }}
                    >
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors shadow-lg shadow-red-600/20"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
