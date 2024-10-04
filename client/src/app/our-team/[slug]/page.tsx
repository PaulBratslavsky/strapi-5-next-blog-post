import qs from "qs";

import { BlockRenderer, TeamPageBlock } from "@/app/components/blocks";

async function getTeamMember(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
      blocks: {
        on: {
          "blocks.testimonial": {
            populate: {
              photo: {
                fields: ["alternativeText", "name", "url"],
              },
            },
          },
          "blocks.spoiler": {
            populate: true,
          },
          "blocks.rich-text": {
            populate: true,
          },
        },
      },
    },
    filters: {
      slug: {
        $eq: slug, // This is the slug for our team member
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  const teamMember = data?.data[0];
  console.dir(teamMember, { depth: null });
  return teamMember;
}

interface UserProfile {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  photo: {
    id: number;
    alternativeText: string;
    name: string;
    url: string;
  };
  blocks: TeamPageBlock[];
}

export default async function TeamMemberDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) return <p>No member found</p>;

  const teamMember = (await getTeamMember(slug)) as UserProfile;

  return (
    <div>
      {teamMember.blocks.map((block: TeamPageBlock) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
