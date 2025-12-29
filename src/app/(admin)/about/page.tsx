import { Code } from '@mantine/core'

export default function AboutPage() {
	const shortCode = `
	...
	sections: [
		{
			title: "Boilerplate",
			items: [
				{
					label: "Página Inicial",
					href: "/",
					icon: Home,
				},
				{
					label: "Sobre",
					href: "/about",
					icon: MessageCircleWarning,
				},
			],
		}
	]
	...
	`
	return (
		<>
			<h1 className='text-3xl'>Sobre</h1>
			<h2 className='text-2xl'>Sidebar</h2>
			<h3 className='text-xl'>Itens de Menu</h3>
			<Code block>
				{shortCode}
			</Code>		
		</>
	)
}