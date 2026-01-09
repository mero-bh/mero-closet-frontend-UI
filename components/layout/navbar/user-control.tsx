import { auth, signOut } from 'auth';
import LightButton from 'components/ui/light-button';
import Link from 'next/link';

export async function NavbarUserControl() {
    const session = await auth();

    if (!session?.user) {
        return (
            <Link href="/login" className="transition-all duration-300">
                <LightButton
                    color="rgba(109, 255, 37, 0.2)" // Subtle green glow
                    className="lowercase"
                >
                    Log In
                </LightButton>
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4">
            {session.user.image && (
                <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="h-8 w-8 rounded-full border border-neutral-300 dark:border-neutral-700"
                />
            )}
            <div className="hidden flex-col md:flex">
                <span className="text-xs font-bold text-foreground">{session.user.name}</span>
                {/* @ts-ignore */}
                {session.user.role === 'admin' && (
                    <span className="text-[10px] uppercase text-purple-500 font-black">Admin</span>
                )}
            </div>
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <button type="submit" className="text-xs text-neutral-500 hover:text-red-500 transition-colors">
                    Logout
                </button>
            </form>
        </div>
    );
}
