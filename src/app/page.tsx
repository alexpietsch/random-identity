"use client"
import { Letter } from "react-letter"
import { useState, useEffect } from "react"

import { MdOutlineCopyAll, MdInfoOutline } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

type EmailMessage = {
  body: string
  date: number
  from: string
  html: string
  ip: string
  subject: string
  to: string
}

const USERNAMES = [
  "dark",
  "light",
  "super",
  "mad",
  "funny",
  "new",
  "happy",
  "cheerful",
  "stark",
  "calm",
  "clancy",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "gray",
  "orange",
  "beige",
  "aqua",
]
const FIRST_NAMES = [
  "James",
  "Robert",
  "John",
  "Michael",
  "David",
  "William",
  "Richard",
  "Joseph",
  "Thomas",
  "Christopher",
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
]
const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
]

const generateUsername = () => {
  return `${USERNAMES[Math.floor(Math.random() * USERNAMES.length)]}${USERNAMES[Math.floor(Math.random() * USERNAMES.length)]}${Math.floor(
    1000 + Math.random() * 9000
  )}`
}

const generatePassword = () => {
  return window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36)
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

  useEffect(() => {
    /* Generate new inbox */
    fetch("https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-fe0afd4a-8adb-4bd1-8b1f-8f8feb60a91d/default/generate")
      .then((r) => r.json())
      .then((data) => {
        setEmailAddress(data?.address)
        setEmailToken(data?.token)
      })
  }, [])

  useEffect(() => {
    setUserName(generateUsername())
    setPassword(generatePassword())
    setFirstName(getFirstName())
    setLastName(getLastName())
  }, [])

  const getEmailMessages = () => {
    fetch("https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-fe0afd4a-8adb-4bd1-8b1f-8f8feb60a91d/default/auth?token=" + emailToken)
      .then((r) => r.json())
      .then((data) => {
        setEmailMessages(data?.email)
        console.log(data)
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
                <MdInfoOutline aria-label="Email info" />
              </PopoverTrigger>
              <PopoverContent>
                This is a temporary email. It&apos;ll last for at most one hour if it receives emails. If no email is sent to the address for 10
                minutes, it will be deleted.
              </PopoverContent>
            </Popover>
          </div>
          <div className="col-start-1 row-start-2 flex justify-center">Username</div>
          <div className="col-start-1 row-start-3 flex justify-center">Password</div>
          <div className="col-start-1 row-start-4 flex justify-center">First name</div>
          <div className="col-start-1 row-start-5 flex justify-center">Last name</div>

          <div className="col-start-2 row-start-1 flex items-center">
            <Button
              aria-label="Copy E-Mail Address"
              onClick={() => {
                navigator.clipboard.writeText(emailAddress)
              }}
              variant="ghost"
            >
              {<MdOutlineCopyAll />}
            </Button>{" "}
            {emailAddress} {!emailAddress && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
          </div>
          <div className="col-start-2 row-start-2 flex items-center">
            <Button
              aria-label="Copy Username"
              onClick={() => {
                navigator.clipboard.writeText(userName)
              }}
              variant="ghost"
            >
              {<MdOutlineCopyAll />}
            </Button>{" "}
            {userName} {!userName && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
          </div>
          <div className="col-start-2 row-start-3 flex items-center">
            <Button
              aria-label="Copy Password"
              onClick={() => {
                console.log(password)
                navigator.clipboard.writeText(password)
              }}
              variant="ghost"
            >
              {<MdOutlineCopyAll />}
            </Button>
            <span
              className={isBlur ? "blur-sm" : ""}
              onMouseEnter={() => setIsBlur(false)}
              onMouseLeave={() => setIsBlur(true)}
              onClick={async () => {
                setIsBlur(false)
                await new Promise((resolve) => setTimeout(resolve, 3000))
                setIsBlur(true)
              }}
            >
              {password}{" "}
            </span>
            {!password && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
          </div>
          <div className="col-start-2 row-start-4 flex items-center">
            <Button
              aria-label="Copy First Name"
              onClick={() => {
                navigator.clipboard.writeText(firstName)
              }}
              variant="ghost"
            >
              {<MdOutlineCopyAll />}
            </Button>{" "}
            {firstName} {!firstName && <Skeleton className="w-[50%] max-w-[200px] h-[20px]" />}
          </div>
          <div className="col-start-2 row-start-5 flex items-center">
            <Button
              aria-label="Copy Last Name"
              onClick={() => {
                navigator.clipboard.writeText(lastName)
              }}
              variant="ghost"
            >
              {<MdOutlineCopyAll />}
            </Button>{" "}
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
          Get Messages for Email
        </Button>

        <div>
          <div className="mt-5">{(!emailMessages || (emailMessages && emailMessages.length < 1)) && <div>No mails</div>}</div>
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
