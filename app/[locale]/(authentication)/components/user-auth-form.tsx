"use client"

import { signInWithDiscord, signInWithEmail, verifyOtp, signInWithGoogle, signInWithPasswordAction } from "@/server/auth"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useI18n, useCurrentLocale } from "@/locales/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator
} from "@/components/ui/input-otp"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
// Link removed; unauthenticated users can't reach settings
import { useAuthPreferenceStore } from "@/store/auth-preference-store"

const formSchema = z.object({
    email: z.string().email(),
    password: z.union([
        z.string().min(6, 'Password must be at least 6 characters'),
        z.literal('')
    ]).optional(),
})

const otpFormSchema = z.object({
    otp: z.string().length(6, "Verification code must be 6 digits"),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type AuthMethod = 'email' | 'discord' | 'google' | null

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isEmailSent, setIsEmailSent] = React.useState<boolean>(false)
    const [countdown, setCountdown] = React.useState<number>(0)
    const [isSubscription, setIsSubscription] = React.useState<boolean>(false)
    const [lookupKey, setLookupKey] = React.useState<string | null>(null)
    const [referralCode, setReferralCode] = React.useState<string | null>(null)
    const [promoCode, setPromoCode] = React.useState<string | null>(null)
    const [authMethod, setAuthMethod] = React.useState<AuthMethod>(null)
    const [showOtpInput, setShowOtpInput] = React.useState<boolean>(false)
    const [nextUrl, setNextUrl] = React.useState<string | null>(null)
    const router = useRouter()
    const { lastAuthPreference, setLastAuthPreference } = useAuthPreferenceStore()
    const [tab, setTab] = React.useState<'magic' | 'password'>(lastAuthPreference)
    const t = useI18n()
    const locale = useCurrentLocale()

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const subscription = urlParams.get('subscription')
        const next = urlParams.get('next')
        const referral = urlParams.get('referral')
        const promo_code = urlParams.get('promo_code')
        setIsSubscription(subscription === 'true')
        const lookup_key = urlParams.get('lookup_key')
        setLookupKey(lookup_key)
        setNextUrl(next)

        // Get promo code from URL
        if (promo_code) {
            setPromoCode(promo_code)
        }

        // Get referral code from URL or localStorage
        if (referral) {
            setReferralCode(referral)
        } else {
            import('@/lib/referral-storage').then(({ getReferralCode }) => {
                const storedRef = getReferralCode()
                if (storedRef) {
                    setReferralCode(storedRef)
                }
            })
        }
    }, [])

    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const otpForm = useForm<z.infer<typeof otpFormSchema>>({
        resolver: zodResolver(otpFormSchema),
        defaultValues: {
            otp: "",
        },
    })

    async function onSubmitEmail(values: z.infer<typeof formSchema>) {
        if (countdown > 0) return

        setIsLoading(true)
        setAuthMethod('email')
        try {
            const referralParam = referralCode ? `&referral=${encodeURIComponent(referralCode)}` : '';
            const promoParam = promoCode ? `&promo_code=${encodeURIComponent(promoCode)}` : '';
            const next = isSubscription
                ? `api/stripe/create-checkout-session?lookup_key=${lookupKey}${referralParam}${promoParam}`
                : nextUrl;
            await signInWithEmail(values.email, next, locale)
            setIsEmailSent(true)
            setShowOtpInput(true)
            setCountdown(15)
        } catch (error) {
            console.error(error)
            setAuthMethod(null)
        } finally {
            setIsLoading(false)
        }
    }

    // Helper function to parse Supabase errors and return user-friendly messages
    function parseAuthError(error: unknown): { message: string; field?: 'email' | 'password' } {
        if (!(error instanceof Error)) {
            return { message: t('auth.errors.signInFailed') }
        }

        const errorMessage = error.message.toLowerCase()

        // Password validation errors
        if (errorMessage.includes('password should contain') ||
            errorMessage.includes('password must contain') ||
            errorMessage.includes('password requirements')) {
            return {
                message: t('auth.errors.passwordTooWeak'),
                field: 'password'
            }
        }

        if (errorMessage.includes('password must be at least') ||
            errorMessage.includes('password is too short')) {
            return {
                message: t('auth.errors.passwordMinLength'),
                field: 'password'
            }
        }

        // Account exists but password is wrong or not set yet
        if (errorMessage.includes('invalid_credentials_or_no_password') ||
            errorMessage.includes('password is incorrect, or this account doesn\'t have a password set')) {
            return {
                message: t('auth.errors.invalidCredentialsOrNoPassword'),
                field: 'password'
            }
        }

        // Email/credential errors (generic - check this after specific cases)
        if (errorMessage.includes('invalid login credentials') ||
            errorMessage.includes('invalid_credentials') ||
            errorMessage.includes('invalid email or password')) {
            return {
                message: t('auth.errors.invalidCredentials'),
                field: 'password'
            }
        }

        if (errorMessage.includes('email not confirmed') ||
            errorMessage.includes('email_not_confirmed')) {
            return {
                message: t('auth.errors.emailNotConfirmed'),
                field: 'email'
            }
        }

        if (errorMessage.includes('user not found') ||
            errorMessage.includes('no user found')) {
            return {
                message: t('auth.errors.userNotFound'),
                field: 'email'
            }
        }

        if (errorMessage.includes('already registered') ||
            errorMessage.includes('user already registered')) {
            return {
                message: t('auth.errors.accountExists'),
                field: 'email'
            }
        }

        // Account exists but no password set (created via magic link)
        // Password reset email has been sent
        if (errorMessage.includes('account_exists_no_password') ||
            errorMessage.includes('doesn\'t have a password set') ||
            errorMessage.includes('password reset email has been sent')) {
            return {
                message: t('auth.errors.accountExistsNoPasswordResetSent'),
                field: 'email'
            }
        }

        // Default: return the original error message but make it more user-friendly
        return {
            message: error.message || t('auth.errors.signInFailed')
        }
    }

    async function onSubmitPassword(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setAuthMethod('email')
        try {
            await signInWithPasswordAction(values.email, values.password || '')
            toast.success(t('success'), { description: t('auth.signIn') })
            router.refresh()
            router.push(nextUrl || '/dashboard')
            setLastAuthPreference('password')
        } catch (error) {
            console.error(error)
            const parsedError = parseAuthError(error)

            // Set form field error if applicable
            if (parsedError.field === 'password') {
                form.setError('password', {
                    type: 'manual',
                    message: parsedError.message
                })
            } else if (parsedError.field === 'email') {
                form.setError('email', {
                    type: 'manual',
                    message: parsedError.message
                })
            }

            // Show toast with user-friendly message
            toast.error(t('error'), {
                description: parsedError.message,
            })
            setAuthMethod(null)
        } finally {
            setIsLoading(false)
        }
    }

    // Signup handled via magic link; no password signup flow here

    async function onSubmitOtp(values: z.infer<typeof otpFormSchema>) {
        setIsLoading(true)
        try {
            const email = form.getValues('email')
            await verifyOtp(email, values.otp)
            toast.success("Successfully verified. Redirecting...", {
                description: "Successfully verified. Redirecting...",
            })
            router.refresh()
            router.push(nextUrl || '/dashboard')
        } catch (error) {
            console.error(error)
            toast.error("Error", {
                description: error instanceof Error ? error.message : "Failed to verify code",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmitDiscord(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        setAuthMethod('discord')

        try {
            const referralParam = referralCode ? `&referral=${encodeURIComponent(referralCode)}` : '';
            const promoParam = promoCode ? `&promo_code=${encodeURIComponent(promoCode)}` : '';
            const next = isSubscription
                ? `api/stripe/create-checkout-session?lookup_key=${lookupKey}${referralParam}${promoParam}`
                : nextUrl;
            await signInWithDiscord(next, locale)
        } catch (error) {
            console.error(error)
            setAuthMethod(null)
            setIsLoading(false)
        }
    }

    async function onSubmitGoogle(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        setAuthMethod('google')

        try {
            const referralParam = referralCode ? `&referral=${encodeURIComponent(referralCode)}` : '';
            const promoParam = promoCode ? `&promo_code=${encodeURIComponent(promoCode)}` : '';
            const next = isSubscription
                ? `api/stripe/create-checkout-session?lookup_key=${lookupKey}${referralParam}${promoParam}`
                : nextUrl;
            await signInWithGoogle(next, locale)
        } catch (error) {
            console.error(error)
            setAuthMethod(null)
            setIsLoading(false)
        }
    }

    function openMailClient() {
        const email = form.getValues('email')
        const domain = email.split('@')[1]?.toLowerCase()

        if (domain?.includes('gmail.com')) {
            window.open('https://mail.google.com', '_blank', 'noopener,noreferrer')
        } else if (
            domain?.includes('outlook.com') ||
            domain?.includes('hotmail.com') ||
            domain?.includes('live.com') ||
            domain?.includes('msn.com') ||
            domain?.includes('office365.com')
        ) {
            window.open('https://outlook.live.com', '_blank', 'noopener,noreferrer')
        } else if (
            domain?.includes('proton.me') ||
            domain?.includes('protonmail.com') ||
            domain?.includes('pm.me')
        ) {
            window.open('https://mail.proton.me', '_blank', 'noopener,noreferrer')
        } else if (
            domain?.includes('icloud.com') ||
            domain?.includes('me.com') ||
            domain?.includes('mac.com')
        ) {
            window.open('https://www.icloud.com/mail', '_blank', 'noopener,noreferrer')
        } else if (domain?.includes('yahoo.com')) {
            window.open('https://mail.yahoo.com', '_blank', 'noopener,noreferrer')
        } else if (domain?.includes('aol.com')) {
            window.open('https://mail.aol.com', '_blank', 'noopener,noreferrer')
        } else if (domain?.includes('zoho.com')) {
            window.open('https://mail.zoho.com', '_blank', 'noopener,noreferrer')
        } else {
            // Default to mailto: for unknown domains
            window.location.href = `mailto:${email}`
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Tabs value={tab} onValueChange={(v) => { setTab(v as 'magic' | 'password'); setLastAuthPreference(v as 'magic' | 'password'); }} className="w-full">
                <TabsList className="grid grid-cols-2 bg-zinc-900/50 p-1 border border-white/5 rounded-lg mb-6">
                    <TabsTrigger value="magic" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-500 text-[10px] uppercase font-bold tracking-widest py-2 rounded-md transition-all">
                        {t('auth.tabs.magic')}
                    </TabsTrigger>
                    <TabsTrigger value="password" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-500 text-[10px] uppercase font-bold tracking-widest py-2 rounded-md transition-all">
                        {t('auth.tabs.password')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="magic" className="mt-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitEmail)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1">{t('auth.emailPlaceholder')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="agent@qunt.edge"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading || isEmailSent || !!authMethod}
                                                className="bg-zinc-900/30 border-zinc-800 focus:border-teal-500/50 focus:ring-0 text-white placeholder:text-zinc-800 h-12 transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px] text-red-400" />
                                    </FormItem>
                                )}
                            />
                            {!isEmailSent && !showOtpInput ? (
                                <Button
                                    disabled={isLoading || countdown > 0 || !!authMethod}
                                    type="submit"
                                    className="w-full bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-widest text-xs h-12 rounded-sm transition-all flex items-center justify-center gap-2 group"
                                >
                                    {isLoading && authMethod === 'email' ? (
                                        <Icons.spinner className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <span>{t('auth.signInWithEmail')}</span>
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </>
                                    )}
                                </Button>
                            ) : null}
                        </form>
                    </Form>

                    {showOtpInput && (
                        <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex flex-col items-center gap-4 py-4 bg-zinc-900/40 border border-white/5 rounded-xl">
                                <span className="text-[10px] uppercase font-bold text-teal-500 tracking-widest">{t('auth.verificationCode')}</span>
                                <Form {...otpForm}>
                                    <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="space-y-6 flex flex-col items-center w-full px-6">
                                        <FormField
                                            control={otpForm.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <InputOTP
                                                            maxLength={6}
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            className="gap-2"
                                                        >
                                                            <InputOTPGroup className="gap-2">
                                                                <InputOTPSlot index={0} className="w-10 h-12 bg-black border-zinc-800 text-white rounded-md focus:border-teal-500" />
                                                                <InputOTPSlot index={1} className="w-10 h-12 bg-black border-zinc-800 text-white rounded-md" />
                                                                <InputOTPSlot index={2} className="w-10 h-12 bg-black border-zinc-800 text-white rounded-md" />
                                                            </InputOTPGroup>
                                                            <InputOTPSeparator className="text-zinc-800" />
                                                            <InputOTPGroup className="gap-2">
                                                                <InputOTPSlot index={3} className="w-10 h-12 bg-black border-zinc-800 text-white rounded-md" />
                                                                <InputOTPSlot index={4} className="w-10 h-12 bg-black border-zinc-800 text-white rounded-md" />
                                                                <InputOTPSlot index={5} className="w-10 h-12 bg-black border-zinc-800 text-white rounded-md" />
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormMessage className="text-[10px] text-red-500 text-center" />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold uppercase tracking-widest text-xs h-12 rounded-sm shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : t('auth.verifyCode')}
                                        </Button>
                                    </form>
                                </Form>

                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={openMailClient}
                                        className="text-[10px] text-zinc-500 hover:text-white uppercase font-bold tracking-widest transition-colors"
                                    >
                                        {t('auth.openMailbox')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={form.handleSubmit(onSubmitEmail)}
                                        disabled={countdown > 0}
                                        className="text-[10px] text-zinc-700 hover:text-zinc-400 uppercase font-bold tracking-widest transition-colors disabled:opacity-30"
                                    >
                                        {countdown > 0 ? `${t('auth.resendIn')} ${countdown}s` : t('auth.resendEmail')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="password" className="mt-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitPassword)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1">{t('auth.emailPlaceholder')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email_password"
                                                placeholder="agent@qunt.edge"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                className="bg-zinc-900/30 border-zinc-800 focus:border-teal-500/50 focus:ring-0 text-white placeholder:text-zinc-800 h-12 transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px] text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1">{t('auth.passwordPlaceholder')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password_login"
                                                placeholder="••••••••••••"
                                                type="password"
                                                autoComplete="current-password"
                                                disabled={isLoading}
                                                className="bg-zinc-900/30 border-zinc-800 focus:border-teal-500/50 focus:ring-0 text-white placeholder:text-zinc-800 h-12 transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px] text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold uppercase tracking-widest text-xs h-12 rounded-sm shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all flex items-center justify-center gap-2 group"
                            >
                                {isLoading && authMethod === 'email' ? (
                                    <Icons.spinner className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <span>{t('auth.signInWithPassword')}</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M14 18l-6-6 6-6" /></svg>
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                    <span className="bg-[#080808] px-4 text-zinc-600">
                        {t('auth.continueWith')}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading || authMethod === 'email'}
                    onClick={onSubmitDiscord}
                    className="border-zinc-800 bg-zinc-900/10 hover:bg-zinc-800 text-zinc-400 hover:text-white h-12 rounded-sm transition-all flex items-center justify-center gap-2"
                >
                    {isLoading && authMethod === 'discord' ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.discord className="h-4 w-4" />
                    )}{" "}
                    <span className="text-[10px] uppercase font-bold tracking-widest">Discord</span>
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading || authMethod === 'email'}
                    onClick={onSubmitGoogle}
                    className="border-zinc-800 bg-zinc-900/10 hover:bg-zinc-800 text-zinc-400 hover:text-white h-12 rounded-sm transition-all flex items-center justify-center gap-2"
                >
                    {isLoading && authMethod === 'google' ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="h-4 w-4" />
                    )}{" "}
                    <span className="text-[10px] uppercase font-bold tracking-widest">Google</span>
                </Button>
            </div>
        </div>
    )
}