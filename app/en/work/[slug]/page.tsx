import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkProjectPage } from "@/components/work-portfolio";
import { getWorkProject, workProjects, workProjectSlugs } from "@/lib/work-projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();

  return {
    title: `${project.title.en} | Selected Work`,
    description: project.summary.en,
    alternates: {
      canonical: `/en/work/${project.slug}`,
      languages: {
        ar: `/work/${project.slug}`,
        en: `/en/work/${project.slug}`,
      },
    },
    openGraph: {
      title: project.title.en,
      description: project.summary.en,
      locale: "en",
      type: "article",
    },
  };
}

export default async function WorkProjectRoute({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = workProjects.findIndex((project) => project.slug === slug);
  if (projectIndex < 0) notFound();

  return (
    <WorkProjectPage
      locale="en"
      project={workProjects[projectIndex]}
      previousProject={workProjects[projectIndex - 1]}
      nextProject={workProjects[projectIndex + 1]}
    />
  );
}
