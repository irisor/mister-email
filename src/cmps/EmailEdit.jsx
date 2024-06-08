import { useSearchParams } from "react-router-dom"

export function EmailEdit() {
	const [searchParams] = useSearchParams()
	const compose = searchParams.get('compose')

	if (!compose) return <></>
	return (
		<section className="email-edit">
			<dialog className="email-edit__dialog" open>
				EmailEdit
			</dialog>
		</section>
	)
}