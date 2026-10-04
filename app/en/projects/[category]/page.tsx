import type { Metadata } from "next";
import { ProjectDomainPage, projectCategoryMetadata, projectCategorySlugs } from "@/components/projects-page";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return projectCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  return projectCategoryMetadata("en", category);
}

export default async function ProjectCategoryPage({ params }: PageProps) {
  const { category } = await params;
  return <ProjectDomainPage locale="en" slug={category} />;
}
