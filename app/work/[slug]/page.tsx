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
    title: `${project.title.ar} | معرض الأعمال`,
    description: project.summary.ar,
    alternates: {
      canonical: `/work/${project.slug}`,
      languages: {
        ar: `/work/${project.slug}`,
        en: `/en/work/${project.slug}`,
      },
    },
    openGraph: {
      title: project.title.ar,
      description: project.summary.ar,
      locale: "ar",
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
      locale="ar"
      project={workProjects[projectIndex]}
      previousProject={workProjects[projectIndex - 1]}
      nextProject={workProjects[projectIndex + 1]}
    />
  );
}
