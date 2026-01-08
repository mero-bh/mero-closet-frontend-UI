import { Tabs, TabsList, TabsTrigger, TabContents, TabsContent } from 'components/ui/tabs';
import { signIn } from 'auth';
import { GoogleIcon, AppleIcon, InstagramIcon } from 'components/icons/social';

export default function LoginPage() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 rounded-3xl border border-neutral-200 bg-white/50 p-8 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-black/50">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
                    <p className="mt-2 text-sm text-neutral-500">Choose your preferred login method</p>
                </div>

                <Tabs defaultValue="social" className="mt-8">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="social">Social</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                    </TabsList>

                    <TabContents>
                        <TabsContent value="social" className="space-y-4 pt-4">
                            <form
                                action={async () => {
                                    "use server"
                                    await signIn("google", { redirectTo: "/" })
                                }}
                            >
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
                                >
                                    <GoogleIcon className="h-5 w-5" />
                                    Continue with Google
                                </button>
                            </form>

                            <form
                                action={async () => {
                                    "use server"
                                    await signIn("apple", { redirectTo: "/" })
                                }}
                            >
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
                                >
                                    <AppleIcon className="h-5 w-5 fill-current" />
                                    Continue with Apple
                                </button>
                            </form>

                            <form
                                action={async () => {
                                    "use server"
                                    await signIn("instagram", { redirectTo: "/" })
                                }}
                            >
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-pink-200 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
                                >
                                    <InstagramIcon className="h-5 w-5" />
                                    Continue with Instagram
                                </button>
                            </form>
                        </TabsContent>

                        <TabsContent value="email" className="space-y-4 pt-4 text-center text-sm text-neutral-500">
                            <p>Email login coming soon...</p>
                        </TabsContent>
                    </TabContents>
                </Tabs>

                <p className="text-center text-xs text-neutral-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}
