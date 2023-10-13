import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MdCheck, MdOutlineCopyAll } from "react-icons/md"

type CopyButtonProps = {
	ariaLabel: string
	copyContent: string
}

const CopyButton = (props: CopyButtonProps) => {
	const { ariaLabel, copyContent } = props

	const [showCopiedIcon, setShowCopiedIcon] = useState(false)

	return (
		<Button
			aria-label={ariaLabel}
			onClick={async () => {
				if (navigator.clipboard) {
					console.log(navigator)

					navigator.clipboard.writeText(copyContent)
				}
				setShowCopiedIcon(true)
				await new Promise(resolve => setTimeout(resolve, 2000))
				setShowCopiedIcon(false)
			}}
			variant="ghost"
			className="m-1"
		>
			{showCopiedIcon ? <MdCheck /> : <MdOutlineCopyAll />}
		</Button>
	)
}

export default CopyButton
