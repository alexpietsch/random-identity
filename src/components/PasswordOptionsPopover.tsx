import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { PasswordOptionsEnum } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"
import { PasswordOptionsType } from "@/lib/types"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

type IProps = {
	passwordOptions: PasswordOptionsType
	setPasswordOptions: Dispatch<SetStateAction<PasswordOptionsType>>
}

export default function PasswordOptionsPopover(props: IProps) {
	const { passwordOptions, setPasswordOptions } = props

	const onValueChange = (value: CheckedState, option: PasswordOptionsEnum) => {
		switch (option) {
			case PasswordOptionsEnum.lowercase:
				setPasswordOptions(prev => ({ ...prev, lowercase: value.valueOf() as boolean }))
				break
			case PasswordOptionsEnum.uppercase:
				setPasswordOptions(prev => ({ ...prev, uppercase: value.valueOf() as boolean }))
				break
			case PasswordOptionsEnum.numbers:
				setPasswordOptions(prev => ({ ...prev, numbers: value.valueOf() as boolean }))
				break
			case PasswordOptionsEnum.symbols:
				setPasswordOptions(prev => ({ ...prev, symbols: value.valueOf() as boolean }))
				break
			default:
				break
		}
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center">
				<Checkbox
					className="m-2"
					id="lowercase"
					checked={passwordOptions.lowercase}
					onCheckedChange={e => onValueChange(e, PasswordOptionsEnum.lowercase)}
				/>
				<label htmlFor="lowercase" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Lowercase
				</label>
			</div>

			<div className="flex flex-row items-center">
				<Checkbox
					className="m-2"
					id="uppercase"
					checked={passwordOptions.uppercase}
					onCheckedChange={e => onValueChange(e, PasswordOptionsEnum.uppercase)}
				/>
				<label htmlFor="uppercase" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Uppercase
				</label>
			</div>

			<div className="flex flex-row items-center">
				<Checkbox
					className="m-2"
					id="numbers"
					checked={passwordOptions.numbers}
					onCheckedChange={e => onValueChange(e, PasswordOptionsEnum.numbers)}
				/>
				<label htmlFor="numbers" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Numbers
				</label>
			</div>

			<div className="flex flex-row items-center">
				<Checkbox
					className="m-2"
					id="symbols"
					checked={passwordOptions.symbols}
					onCheckedChange={e => onValueChange(e, PasswordOptionsEnum.symbols)}
				/>
				<label htmlFor="symbols" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Symbols
				</label>
			</div>

			<div className="flex flex-col">
				<label htmlFor="length" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-4">
					Length
				</label>
				<div className="flex flex-row items-center mt-3">
					<Input
						className="w-16"
						type="number"
						max={100}
						value={passwordOptions.length}
						onChange={e => setPasswordOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
					/>
					<Slider
						className="m-1"
						defaultValue={[passwordOptions.length]}
						max={100}
						step={1}
						value={[passwordOptions.length]}
						onValueChange={e => setPasswordOptions(prev => ({ ...prev, length: e[0] }))}
					/>
				</div>
			</div>
		</div>
	)
}
