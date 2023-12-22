"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";

interface PointsContent {
	heading: string;
	list: string[];
}

interface CoursesProps {
	courses: {
		heading: string;
		text?: string;
		image: string;
		link?: string;
		points?: boolean;
		pointsContent?: PointsContent;
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
					{children}

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
					{item.text && <p>{item.text}</p>}

					{item.points && (
						<>
							<h3>{item.pointsContent?.heading}</h3>

							<ul>
								{item.pointsContent?.list.map((item) => {
									return <li key={item}>{item}</li>;
								})}
							</ul>
						</>
					)}
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
