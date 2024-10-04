import Image from "next/image";

export interface TestimonialBlock {
  __component: "blocks.testimonial";
  id: number;
  authorName: string;
  quote: string;
  photo: {
    id: number;
    documentId: string;
    alternativeText: string | null;
    name: string;
    url: string;
  };
}

export function TestimonialBlock({ block }: { block: TestimonialBlock }) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${block?.photo?.url}`;

  return (
    <figure className="relative bg-gray-100 rounded-lg border border-gray-200 overflow-hidden my-6">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-64 md:h-full col-span-1">
          <Image
            src={imageUrl}
            alt={block.photo.alternativeText || block.authorName}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-center"
          />
        </div>
        <div className="p-8 col-span-2 flex flex-col justify-center">
          <blockquote className="relative">
            <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-300 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="relative text-xl font-medium text-gray-900 mb-4">
              {block.quote}
            </p>
          </blockquote>
          <figcaption className="font-semibold text-indigo-600 mt-2">
            {block.authorName}
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
