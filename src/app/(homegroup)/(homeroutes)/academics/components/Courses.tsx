"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";

interface CoursesProps {
	courses: {
		heading: string;
		text: string;
		image: string;
		link?: string;
	}[];
}

interface AccordionElement {
	children: React.ReactNode;
	image?: string;
	link?: string;
}

function AccordionTrigger({ children, ...props }: AccordionElement) {
	return (
		<Accordion.Header className="accordion-header">
			<Accordion.Trigger className="accordion-trigger" {...props}>
				{children}
				<span>
					<span></span>
					<span></span>
				</span>
			</Accordion.Trigger>
		</Accordion.Header>
	);
}

function AccordionContent({
	children,
	image,
	link,
	...props
}: AccordionElement) {
	return (
		<Accordion.Content {...props} className="accordion-content">
			<div className="accordion-content__text">
				<div className="content-text">
					<p>{children}</p>

					{link && (
						<a href={link} target="_blank">
							En savoir plus
						</a>
					)}
				</div>

				<div className="content-image">
					<img src={image} loading="lazy" />
				</div>
			</div>
		</Accordion.Content>
	);
}

export default function Courses({ courses }: CoursesProps) {
	const accordionItems = courses.map((item, index) => {
		return (
			<Accordion.Item
				key={item.heading}
				className="accordion-item"
				value={index.toString()}
			>
				<AccordionTrigger>{item.heading}</AccordionTrigger>

				<AccordionContent image={item.image} link={item.link}>
					{item.text}
				</AccordionContent>
			</Accordion.Item>
		);
	});

	return (
		<div className="courses">
			<div className="courses-accordion">
				<Accordion.Root
					className="accordion-root"
					type="single"
					collapsible
				>
					{accordionItems}
				</Accordion.Root>
			</div>
		</div>
	);
}
