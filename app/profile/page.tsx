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
                <div className="flex justify-end">
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
