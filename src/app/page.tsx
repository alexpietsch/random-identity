"use client"
import { Letter } from "react-letter"
import { useState, useEffect } from "react"

import { MdOutlineCopyAll, MdInfoOutline, MdAutorenew, MdMoreHoriz } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import PasswordOptionsPopover from "@/components/PasswordOptionsPopover"

import { EmailMessage, PasswordOptionsType } from "@/lib/types"
import { Toaster } from "@/components/ui/toaster"

import { FIRST_NAMES, LAST_NAMES, USERNAMES } from "@/lib/constants"
import CopyButton from "@/components/CopyButton"

const generateUsername = () => {
	return `${USERNAMES[Math.floor(Math.random() * USERNAMES.length)]}${USERNAMES[Math.floor(Math.random() * USERNAMES.length)]}${Math.floor(
		1000 + Math.random() * 9000
	)}`
}

const getFirstName = () => {
	return FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
}

const getLastName = () => {
	return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
}

export default function Home() {
	const [emailAddress, setEmailAddress] = useState("")
	const [emailToken, setEmailToken] = useState("")
	const [emailMessages, setEmailMessages] = useState<EmailMessage[]>()
	const [isBlur, setIsBlur] = useState(true)

	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")

	const [passwordOptions, setPasswordOptions] = useState<PasswordOptionsType>({
		lowercase: true,
		uppercase: true,
		numbers: true,
		symbols: true,
		length: 16
	})

	const { toast } = useToast()

	const generatePassword = () => {
		const lowercase = "abcdefghijklmnopqrstuvwxyz"
		const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		const numbers = "0123456789"
		const symbols = "!@#$%^&*()_+-=[]{};':,.?"

		const allChars = `${passwordOptions.lowercase ? lowercase : ""}${passwordOptions.uppercase ? uppercase : ""}${
			passwordOptions.numbers ? numbers : ""
		}${passwordOptions.symbols ? symbols : ""}`

		let password = ""
		for (let i = 0; i < passwordOptions.length; i++) {
			password += allChars.charAt(Math.floor(Math.random() * allChars.length))
		}

		return password
	}

	useEffect(() => {
		/* Generate new inbox */
		fetch("https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-fe0afd4a-8adb-4bd1-8b1f-8f8feb60a91d/default/generate")
			.then(r => r.json())
			.then(data => {
				setEmailAddress(data?.address)
				setEmailToken(data?.token)
			})
	}, [])

	useEffect(() => {
		setUserName(generateUsername())
		setFirstName(getFirstName())
		setLastName(getLastName())
	}, [])

	useEffect(() => {
		setPassword(generatePassword())
	}, [passwordOptions])

	const getEmailMessages = () => {
		fetch("https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-fe0afd4a-8adb-4bd1-8b1f-8f8feb60a91d/default/auth?token=" + emailToken)
			.then(r => r.json())
			.then(data => {
				setEmailMessages(data?.email)
			})
	}

	const toastCopied = (type: string) => {
		toast({
			title: "Copied!",
			description: `Copied ${type} to clipboard!`
		})
	}

	return (
		<main className="flex h-screen w-full flex-col items-center">
			<div className="h-[10vh] w-screen p-3 flex flex-col items-center">
				<p className="text-2xl font-bold underline">Random identity</p>
				<p className="mt-2">
					To get a new identity, just{" "}
					<span className="underline cursor-pointer" onClick={() => location.reload()}>
						refresh the page
					</span>
				</p>
			</div>
			<div className="w-screen p-3 mt-10" style={{ overflowWrap: "break-word" }}>
				<div className="grid grid-cols-2 grid-rows-5 gap-4 items-center">
					<div className="col-start-1 row-start-1 flex justify-center" style={{ overflow: "auto" }}>
						Email
						<Popover>
							<PopoverTrigger>
								<MdInfoOutline aria-label="Email info" className="ml-2" />
							</PopoverTrigger>
							<PopoverContent>
								This is a temporary email. It&apos;ll last for at most one hour if it receives emails. If no email is sent to the
								address for 10 minutes, it will be deleted.
							</PopoverContent>
						</Popover>
					</div>
					<div className="col-start-1 row-start-2 flex justify-center">Username</div>
					<div className="col-start-1 row-start-3 flex justify-center">Password</div>
					<div className="col-start-1 row-start-4 flex justify-center">First name</div>
					<div className="col-start-1 row-start-5 flex justify-center">Last name</div>

					<div className="col-start-2 row-start-1 flex items-center">
						<CopyButton ariaLabel="Copy Email" copyContent={emailAddress} />
						{emailAddress} {!emailAddress && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
					</div>

					<div className="col-start-2 row-start-2 flex items-center">
						<CopyButton ariaLabel="Copy Username" copyContent={userName} />
						<Button
							aria-label="Re-generate Username"
							onClick={() => {
								setUserName(generateUsername())
							}}
							variant="ghost"
							className="m-1"
						>
							{<MdAutorenew />}
						</Button>
						{userName} {!userName && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
					</div>

					<div className="col-start-2 row-start-3 flex items-center">
						<CopyButton ariaLabel="Copy Password" copyContent={password} />

						<Button
							aria-label="Re-generate Password"
							onClick={() => {
								setPassword(generatePassword())
							}}
							variant="ghost"
							className="m-1"
						>
							{<MdAutorenew />}
						</Button>

						<div className="mr-4">
							<Popover>
								<PopoverTrigger>{<MdMoreHoriz />}</PopoverTrigger>
								<PopoverContent>
									<PasswordOptionsPopover passwordOptions={passwordOptions} setPasswordOptions={setPasswordOptions} />
								</PopoverContent>
							</Popover>
						</div>

						<span
							className={isBlur ? "blur-sm" : ""}
							onMouseEnter={() => setIsBlur(false)}
							onMouseLeave={() => setIsBlur(true)}
							onClick={async () => {
								setIsBlur(false)
								await new Promise(resolve => setTimeout(resolve, 3000))
								setIsBlur(true)
							}}
						>
							{password}
						</span>

						<div>{!password && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}</div>
					</div>

					<div className="col-start-2 row-start-4 flex items-center">
						<CopyButton ariaLabel="Copy First Name" copyContent={firstName} />
						<Button
							aria-label="Re-generate First Name"
							onClick={() => {
								setFirstName(getFirstName())
							}}
							variant="ghost"
							className="m-1"
						>
							{<MdAutorenew />}
						</Button>
						{firstName} {!firstName && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
					</div>

					<div className="col-start-2 row-start-5 flex items-center">
						<CopyButton ariaLabel="Copy Last Name" copyContent={lastName} />
						<Button
							aria-label="Re-generate Last Name"
							onClick={() => {
								setLastName(getFirstName())
							}}
							variant="ghost"
							className="m-1"
						>
							{<MdAutorenew />}
						</Button>
						{lastName} {!lastName && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
					</div>
				</div>
			</div>
			<div>
				<span className="text-lg font-semibold">Emails</span>
			</div>
			<Separator />
			<div className="h-[50vh] w-full flex flex-col items-center mt-4">
				<Button aria-label="Load E-Mail messages" onClick={getEmailMessages} className="w-[80%] max-w-md">
					Fetch messages for Email
				</Button>

				<div>
					<div className="mt-5">
						{(!emailMessages || (emailMessages && emailMessages.length < 1)) && <div className="text-">No mails</div>}
					</div>
					<div className="mt-5">
						{emailMessages &&
							emailMessages.map((message: EmailMessage) => {
								return (
									<div
										key={window.crypto.randomUUID()}
										className="border rounded-md border-gray-600 p-5 max-w-screen-lg m-4"
										style={{ overflowWrap: "break-word" }}
									>
										<>
											<span className="text-xl font-bold">Subject:</span> {message.subject}
										</>
										<Letter html={message.body} />
									</div>
								)
							})}
					</div>
				</div>
			</div>
		</main>
	)
}
