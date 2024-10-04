In this beginner friendly tutorial, we will take a look on building a dynamic website using Next.js 14 and Strapi 5, a headless content management system (CMS). This blog post is based on the video tutorial by Brad Schiff, which can be found [here](https://www.youtube.com/watch?v=04bNEnIzCJc).

![What we will build](/images/033-strapi-team-member.gif)

Don't let the simplicity fool you. In this tutorial we wil cover the following topics.

- Next.js App Router
- Dynamic Routing
- Styling with Tailwind CSS
- Creating Pages
- Integrating Strapi 5 with Next.js
- Custom Components in Next.js
- Custom Components in Strapi
- Populate and Filtering in Strapi
- Populating Dynamic Zone Fields
- Rendering Dynamic Zone Fields

I will walk you through the steps I took when following the tutorial, just in case your prefer to read instead of watching the video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/04bNEnIzCJc?si=I0Oy0ZXs6pHDycrE" title="YouTube video player" frameborder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

But I would recommend doing both, in my tutorial I ended up using TypesScript and taking a different approach when rendering Strapi's dynamic zone. 

As a bonus, we used Strapi's Block Editor and I show you how to render not only the text blocks but also the image.

Let's get started!

First start by choosing a directory to setup your project in. I am going to name my project directory "brad"

```bash
mkdir brad
cd brad
```

After changing into the directory, we will start by creating a new Next.js app by running the following command.

```bash
npx create-next-app@latest
```

You can learn more about getting started with Next.js [here](https://nextjs.org/docs/getting-started/installation)

We will be prompted with the following options: here is what I chose.

```bash
➜  brad git:(main) ✗ npx create-next-app@latest
✔ What is your project named? … client
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … No
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … No
Creating a new Next.js app in /Users/paulbratslavsky/Desktop/work/tutorials-and-posts/brad/client.

```

Now that we have our project setup, we can start by running the development server.

```bash
cd client
yarn dev
```

You can navigate to the following URL to view the app: http://localhost:3000 and you should see the following screen.

![001-nextjs-home.png](/images/001-nextjs-home.png)

Nice! We have a basic Next.js app setup and running.

## Setting Up Our Next.js UI and Layout.

In this section we will setup our Next.js UI and Layout. Once we are done, we should have something that looks like this:

![002-next-js-ui.gif](/images/002-next-js-ui.gif)

**Building the Header Component**

To get started, we will create a new folder in the `src/app` directory and name it `components`. Inside this folder, we will create a new file and name it `header.tsx`. This file will contain our header component.

Inside the `header.tsx` file, let's start by adding the following code:

```tsx
import Link from "next/link";
import NavLink from "./nav-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" },
];

export default function Header() {
  return (
    <header className="bg-white/50">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href="/">Our Cool Project</Link>

        <ul className="flex gap-4">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

The above code is responsible for rendering our header component. It creates a `header` element with a `nav` element inside it. The `nav` element contains a `Link` component for the logo and a `ul` element with `NavLink` components for the navigation links.

We are iterating over the `links` array to create a `NavLink` component for each link. The `NavLink` component is a custom component that we will create in the next section. It is responsible for rendering a link that is active when the current path matches the href of the link.

**Building the NavLink Component**

Inside the `components` folder, we will create a new file and name it `nav-link.tsx`. This file will contain our `NavLink` component.

Let's start by adding the following code:

```tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import path from "path";

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: Readonly<NavLinkProps>) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={cn(
          isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
        )}
      >
        {children}
      </Link>
    </li>
  );
}
```

Nice! We have a `NavLink` component that is responsible for rendering a link that is active when the current path matches the href of the link.

**Building the Footer Component**

Inside the `components` folder, we will create a new file and name it `footer.tsx`. This file will contain our `Footer` component.

Let's start by adding the following code:

```tsx
export default function Footer() {
  return (
    <footer className="bg-white/50">
      <div className="container mx-auto flex justify-center items-center py-4">
        <div>&copy; {new Date().getFullYear()} Our Company Name</div>
      </div>
    </footer>
  );
}
```

Nice! We have a `Footer` component that is responsible for rendering a footer with a copyright notice.

**Building the Layout Component**

Now let's update our `layout.tsx` file to include our `Header` and `Footer` components. The `layout.tsx` file is responsible for rendering the layout of our app. It is the root component that wraps around our entire app.

Let's start by updating the `layout.tsx` file with the following code:

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gray-200 min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Header />
          <main className="container mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

Nice! We have a `Layout` component that is responsible for rendering the layout of our app. It includes our `Header` and `Footer` components.

In our project we will have the following pages:

- Home
- Our Team
- About Us

Let's start by creating our routes for the pages above.

In the `app` folder, we already have a `page.tsx` file. This file is our `Home` page.

Let's update the `page.tsx` file with the following code:

```tsx
export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
```

Nice! We have a `Home` page.

Now let's create our `Our Team` page. In the `app` folder, we will create a new folder and name it `our-team`. Inside this folder, we will create a new file and name it `page.tsx`. This file will contain our `Our Team` page.

Let's start by adding the following code:

```tsx
export default function OurTeam() {
  return (
    <div>
      <h1>Our Team</h1>
    </div>
  );
}
```

Nice! We have a `Our Team` page.

And finally let's create our `About Us` page. In the `app` folder, we will create a new folder and name it `about-us`. Inside this folder, we will create a new file and name it `page.tsx`. This file will contain our `About Us` page.

Let's start by adding the following code:

```tsx
export default function AboutUs() {
  return (
    <div>
      <h1>About Us</h1>
    </div>
  );
}
```

Nice, now we have all of our basic pages setup.

In the next section we will start to setup our Strapi backend.

## Getting Started with Strapi 5

Strapi is an open-source headless content management system (CMS) that allows you to create, manage, and serve content through a flexible API.

![Strapi](/images/003-strapi.png)

We are going to use Strapi to power the backend of our application, enabling non-developers or non-programmers to easily contribute and manage content for the website, such as team member profiles.

![Strpai API](/images/004-strapi-api.gif)

By integrating Strapi with Next.js, we can dynamically fetch and display this content on the frontend, allowing for a seamless and interactive user experience. Strapi simplifies the process of handling data and offers a user-friendly admin interface for content management.

We can get started by running the following command in the root of our project:

```bash
npx create-strapi-app@latest server
```

We will be prompted with the following options: here is what I chose.

```bash
 Strapi   v5.0.2 🚀 Let's create your new project


We can't find any auth credentials in your Strapi config.

Create a free account on Strapi Cloud and benefit from:

- ✦ Blazing-fast ✦ deployment for your projects
- ✦ Exclusive ✦ access to resources to make your project successful
- An ✦ Awesome ✦ community and full enjoyment of Strapi's ecosystem

Start your 14-day free trial now!


? Please log in or sign up.
  Login/Sign up
❯ Skip

```

For the purposes of this tutorial, we will choose to skip the login step.

After we hit enter, we will see the following options: here is what I chose.

```bash
? Please log in or sign up. Skip
? Do you want to use the default database (sqlite) ? Yes
? Start with an example structure & data? No
? Start with Typescript? Yes
? Install dependencies with npm? Yes
? Initialize a git repository? Yes

 Strapi   Creating a new application at /Users/paulbratslavsky/Desktop/work/tutorials-and-posts/brad/server
```

Once everything is setup, we can start the Strapi server by running the following command:

```bash
cd server
yarn develop
```

And we should be greeted with the following screen: go ahead and create your first **Strapi Admin User**.

![Strapi Admin User](/images/005-strapi-admin-user.png)

After you have successfully created the user, you should be redirected to the Strapi Welcome screen.

![Strapi Welcome](/images/006-strapi-welcome.png)

In this tutorial we be primary focusing on collection types, which are essential for structuring our data in a way that is easily accessible and manageable.

Collection types in Strapi are used to define a group of similar data entries. For instance, in our case, we will create a collection type called "Team Members." This collection will allow us to manage individual profiles for each team member, including fields such as their name, description, photograph, and a URL-friendly slug.

The use of collection types is beneficial because it provides a structured format for data, making it straightforward to add, edit, or remove entries as needed. Each team member's data can be easily retrieved via API endpoints, enabling our frontend to dynamically display the information without hardcoding it.

## Building Our First Collection Type In Strapi 5

We will start by creating a new collection type called "Team Member."

![Strapi Collection Type](/images/007-strapi-collection-type.png)

Once you click on "Continue" you will be redirected to the following screen:

![Strapi Collection Type Fields](/images/008-strapi-collection-type-fields.png)

Now let's start by adding the following fields to our collection type:

| Field Name  | Field Type | Additional Info  |
| ----------- | ---------- | ---------------- |
| name        | Text       | Short text input |
| description | Text       | Long text input  |
| photo       | Media      | Single media     |
| slug        | UID        | Reference name   |

Once you have added all of the fields, you can click on "Save" to save the collection type.

![Strapi Collection Type Fields](/images/009-strapi-collection-type-fields.png)

Now that we have our collection type setup, we can start adding some data to it. Go ahead and add your first team member.

![Adding Team Member Data](/images/010-adding-team-member-data.gif)

Nice! We have added our first team member.

Now that we have our team member data in place, let's see how we can access our **team member data** in via Strapi API.

But first let's give our API appropriate permissions to access our team member data.

We can do this in the `Settings` section of Strapi.

![Strapi Settings](/images/011-strapi-settings.png)

We are going to navigate to `Users & Permissions` plugin. Once we are in the `Users & Permissions` plugin, we will navigate to the `Roles` section, select the `Public` role, and then click on the `Team Members` permission.

We will set `find` to `true` and `findOne` to `true`. This will give our API the necessary permissions to fetch and display our team member data.

We should be able to make a request to the following URL to fetch our team member data:

```bash
http://localhost:1337/api/team-members
```

And see the following response:

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "ybk38754pitymo4wxcn3mjct",
      "name": "Sarah",
      "description": "Hello I am Sarah.",
      "slug": "sarah",
      "createdAt": "2024-10-03T17:50:37.403Z",
      "updatedAt": "2024-10-03T17:50:37.403Z",
      "publishedAt": "2024-10-03T17:50:37.411Z",
      "locale": null
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

You will notice that we are not yet seeing the `photo` data in the response. This is because we need to tell Strapi to include the `photo` field in the response by using our `populate` and `filtering` flags.

This is something we will do as we start to build our frontend.

## How To Fetch Data In Next.js

Now that we have our Strapi backend setup, let's start to build our frontend. In this section we will start by fetching our team member data in Next.js.

With the addition of Next.js **Server Components** we can now fetch data directly in our components.

Let's see how we can accomplish this withing our `Our Team` page.

Let's start by updating our `our-team/page.tsx` file with the following code:

```tsx
async function getTeamMembers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;
}

export default async function OurTeam() {
  const teamMembers = await getTeamMembers();
  console.log(teamMembers);

  return (
    <div>
      <h1>Our Team</h1>
      <pre>{JSON.stringify(teamMembers, null, 2)} </pre>
    </div>
  );
}
```

This will go ahead and fetch our team member data from our Strapi backend and display it in the browser.

Now, let's update this to populate our `photo` field.

You can learn more about Strapi's Populate and Filtering [here](https://docs.strapi.io/dev-docs/api/rest/populate-select) but I will walk you through the steps here.

We will start by constructing the `query` object using **Strapi's Query Builder** that you can find [here](https://docs.strapi.io/dev-docs/api/rest/interactive-query-builder).

Here is the basic our query will look like:

![Strapi Query](/images/012-strapi-query.png)

Go ahead and copy the **Query String URL** and make a request to the following URL in your browser:

[http://localhost:1337/api/team-members?populate[photo][fields][0]=alternativeText&populate[photo][fields][1]=name&populate[photo][fields][2]=url](http://localhost:1337/api/team-members?populate[photo][fields][0]=alternativeText&populate[photo][fields][1]=name&populate[photo][fields][2]=url)

You should see the following response:

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "ybk38754pitymo4wxcn3mjct",
      "name": "Sarah",
      "description": "Hello I am Sarah.",
      "slug": "sarah",
      "createdAt": "2024-10-03T17:50:37.403Z",
      "updatedAt": "2024-10-03T17:50:37.403Z",
      "publishedAt": "2024-10-03T17:50:37.411Z",
      "locale": null,
      "photo": {
        "id": 1,
        "documentId": "e2zyo9559mmgj3tu3f4olngz",
        "alternativeText": null,
        "name": "computer-working.jpg",
        "url": "/uploads/computer_working_3ec59d6554.jpg"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

Notice how we now see the `photo` data in the response.

To recap, in our collection type we added the following fields:

- name
- description
- slug
- photo

Name, Description, and Slug are all what I would call `top level fields`. That is because they do not have any relationships to other entities.

Since `photo` is a relationship to another entity, image, we need to populate it.

As we did above using Strapi's Query Builder. Where we passed the following to the query:

```tsx
{
  populate: {
    photo: {
      fields: ['alternativeText', 'name', 'url']
    }
  },
}
```

Now, let's update our **Our Team** `page.tsx` file to display utilize our populate logic that we learned about above.

To help us to accomplish this, we will install a new package called `qs`. This package will help us to construct our query string.

You can install the package by running the following command:

```bash
yarn add qs
yarn add @types/qs
```

You can learn more about the `qs` package [here](https://www.npmjs.com/package/qs).

Let's start by updating our `getTeamMembers` function to utilize the `qs` package.

First we will import the `qs` package at the top of the file.

```tsx
import qs from "qs";
```

And then we will update our `getTeamMembers` function to utilize the `qs` package.

```tsx
async function getTeamMembers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;
}
```

The complete code for our `Our Team` page should now look like this:

```tsx
import qs from "qs";

async function getTeamMembers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;
}

export default async function OurTeam() {
  const teamMembers = await getTeamMembers();
  console.log(teamMembers);

  return (
    <div>
      <h1>Our Team</h1>
      <pre>{JSON.stringify(teamMembers, null, 2)} </pre>
    </div>
  );
}
```

In the next section we will start to build our frontend to display our team members.

## Building Our Team Member Card Component

In this section we will start to build our `Team Member Card` component. This component will be responsible for displaying a single team member profile.

Inside our **Our Team** `page.tsx` file, we will start by creating a new component that we will name `TeamMemberCard`. This component will be responsible for displaying a single team member profile.

Let's start by adding the following code:

```tsx
interface TeamMemberProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  photo: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  };
}

function TeamMemberCard({
  name,
  description,
  photo,
  slug,
}: Readonly<TeamMemberProps>) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${photo.url}`;
  return (
    <Link
      href={`/our-team/${slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt={photo.alternativeText || name}
        width={500}
        height={500}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
```

This component will be responsible for displaying a single team member profile.

And update our `Our Team` component to utilize our `TeamMemberCard` component.

```tsx
export default async function OurTeam() {
  const teamMembers = await getTeamMembers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.data.map((member: TeamMemberProps) => (
          <TeamMemberCard key={member.documentId} {...member} />
        ))}
      </div>
    </div>
  );
}
```

The complete code for our `Our Team` page should now look like this:

```tsx
import qs from "qs";
import Image from "next/image";

async function getTeamMembers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;
}

interface TeamMemberProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  photo: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  };
}

function TeamMemberCard({
  name,
  description,
  photo,
  slug,
}: Readonly<TeamMemberProps>) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${photo.url}`;
  return (
    <Link
      href={`/our-team/${slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt={photo.alternativeText || name}
        width={500}
        height={500}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default async function OurTeam() {
  const teamMembers = await getTeamMembers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.data.map((member: TeamMemberProps) => (
          <TeamMemberCard key={member.documentId} {...member} />
        ))}
      </div>
    </div>
  );
}
```

If we navigate to our `Our Team` page, we will see the following error:

![Our Team Page Error](/images/013-our-team-page-error.png)

To fix this error, we need to update our `next.config.mjs` file to include our Strapi server as a remote pattern.

```mjs
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
```

Now restart your development server and navigate to our `Our Team` page and we should see the following:

![Our Team Page](/images/014-our-team-page.png)

Nice, now that we can display our team members, let's start to build our `Team Member Detail` page. But before we do that, let's start by learning about **Strapi's Components** and **Dynamic Zones**.

## Managing Content in Strapi with Components and Dynamic Zones

In this section we will start by learning about Strapi's Components and Dynamic Zones.

Components are reusable building blocks that can be used to build pages. Dynamic zones are special components that can be used to build pages.

**Testimonial Component**
We will start by creating a new **Testimonial** component.

![Strapi Components](/images/015-strapi-components.png)

I am going to name in `testimonial` and add create a `blocks` category.

Now let's click on the `Continue` button and add our first fields.

I am going to add the following fields:

| Field Name | Field Type | Additional Info  |
| ---------- | ---------- | ---------------- |
| authorName | Text       | Short text input |
| quote      | Text       | Long text input  |
| photo      | Media      | Single media     |

Here is what the final fields should look like:

![Strapi Testimonial Component](/images/016-strapi-testimonial-component.png)

**Spoiler Component**
Now let's create another component, we will name it `spoiler`.

I am going to add the following fields:

| Field Name | Field Type | Additional Info  |
| ---------- | ---------- | ---------------- |
| title      | Text       | Short text input |
| content    | Text       | Long text input  |

Here is what the final fields should look like:

**Content Component**

![Strapi Spoiler Component](/images/017-strapi-spoiler-component.png)

And finally let's create one more component, we will name it `richText`.

I am going to add the following field:

| Field Name | Field Type | Additional Info |
| ---------- | ---------- | --------------- |
| content    | Rich Text  | Rich text input |

Here is what the final fields should look like:

![Strapi Content Component](/images/019-strapi-content-component.png)

Nice! Now that we have our components created, let's start to build our dynamic zones.

Let's navigate to our `Team Member` collection type and click on `Add another field to this collection type`.

![Strapi Dynamic Zone 1](/images/020-strapi-dynamic-zone-1.png)

We will scroll down and find the `Dynamic Zone` and add it to our collection type.

![Strapi Dynamic Zone 2](/images/021-strapi-dynamic-zone-2.png)

Let's name it `blocks` and click on `Add component to the zone`.

![Strapi Dynamic Zone 3](/images/022-strapi-dynamic-zone-3.png)

I will add our `Testimonial`, `Spoiler`, and `Rich Text` components that we created earlier and click on `Finish`. You should see the following screen:

![Strapi Dynamic Zone 4](/images/023-strapi-dynamic-zone-4.png)

Don't forget to click on `Save` to save the dynamic zone.

Now let's go ahead and add some data to our `Team Member` collection type.

![Strapi Team Member Data](/images/025-strapi-team-member-data.gif)

Nice, now let's see how we can fetch this data in our Next.js application.

But first, let's revisit our `populate` logic. We did a little bit of this already when we were building our `Our Team` page.

But now that we are using dynamic zones, we need to update our populate logic to include our `blocks` field. And for this, we will use the `on` flag.

You can learn more about Strapi's `on` flag [here](https://docs.strapi.io/dev-docs/api/rest/guides/understanding-populate#populate-dynamic-zones).

![Strapi Populate Dynamic Zone](/images/026-strapi-populate-dynamic-zone.png)

And here is the example query we would use to populate the above dynamic zone example:

```tsx
{
  populate: {
    blocks: { // asking to populate the blocks dynamic zone
      on: { // using a detailed population strategy to explicitly define what you want
        'blocks.related-articles': {
          populate: {
           'articles': {
             populate: ['image']
           }
         }
        },
        'blocks.cta-command-line': {
          populate: '*'
        }
      },
    },
  },
}
```

We will use similar populate logic as the example above to populate our `blocks` dynamic zone.

**Populating Our Dynamic Zone**

Taking a look at our `Team Member` collection we can see that we have our `blocks` dynamic zone field.

![Strapi Team Member Collection](/images/027-strapi-team-member-collection.png)

We can target the `blocks` field by using the `on` flag. We can also see that our `Testimonial` component has a `photo` field, which is a relationship to our `Media` content type. So will will populate the fields that we need using the `fields` flag.

![Strapi Populate Dynamic Zone](/images/028-strapi-populate-dynamic-zone-2.png)

Here is what the populate logic will look like:

```tsx
{
  populate: {
    photo: {
      fields: ['alternativeText', 'name', 'url']
    },
    blocks: {
      on: {
        'blocks.testimonial': {
          populate: {
            photo: {
              fields: ['alternativeText', 'name', 'url']
            }
          }
        }
      }
    }
  },
}

```

We can make a request to the following URL with the above populate logic included in the query string and we should see the following response:

[http://localhost:1337/api/team-members?populate[photo][fields][0]=alternativeText&populate[photo][fields][1]=name&populate[photo][fields][2]=url&populate[blocks][on][blocks.testimonial][populate][photo][fields][0]=alternativeText&populate[blocks][on][blocks.testimonial][populate][photo][fields][1]=name&populate[blocks][on][blocks.testimonial][populate][photo][fields][2]=url](http://localhost:1337/api/team-members?populate[photo][fields][0]=alternativeText&populate[photo][fields][1]=name&populate[photo][fields][2]=url&populate[blocks][on][blocks.testimonial][populate][photo][fields][0]=alternativeText&populate[blocks][on][blocks.testimonial][populate][photo][fields][1]=name&populate[blocks][on][blocks.testimonial][populate][photo][fields][2]=url)

```json
{
  "data": [
    {
      "id": 4,
      "documentId": "ybk38754pitymo4wxcn3mjct",
      "name": "Sarah",
      "description": "Hello I am Sarah.",
      "slug": "sarah",
      "createdAt": "2024-10-03T17:50:37.403Z",
      "updatedAt": "2024-10-03T21:17:22.740Z",
      "publishedAt": "2024-10-03T21:17:22.751Z",
      "locale": null,
      "photo": {
        "id": 1,
        "documentId": "e2zyo9559mmgj3tu3f4olngz",
        "alternativeText": null,
        "name": "computer-working.jpg",
        "url": "/uploads/computer_working_3ec59d6554.jpg"
      },
      "blocks": [
        {
          "__component": "blocks.testimonial",
          "id": 3,
          "authorName": "Sarah",
          "quote": "Strapi 5 is awesome.",
          "photo": {
            "id": 1,
            "documentId": "e2zyo9559mmgj3tu3f4olngz",
            "alternativeText": null,
            "name": "computer-working.jpg",
            "url": "/uploads/computer_working_3ec59d6554.jpg"
          }
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

Nice! Notice we can see our `testimonial` component data in the response.

The last item that we need to solve before implementing our `Team Member Detail` page is to make sure that we know how to fetch a single team member via the `slug` field.

Let's update our `query` from above to include the `filters` flag. Here is what the updated query should look like:

```tsx
{
  populate: {
    photo: {
      fields: ['alternativeText', 'name', 'url']
    },
    blocks: {
      on: {
        'blocks.testimonial': {
          populate: {
            photo: {
              fields: ['alternativeText', 'name', 'url']
            }
          }
        },
      }
    }
  },
  filters: {
    slug: {
      $eq: "sarah" // This is the slug for our team member
    }
  }
}
```

This will allow us to just fetch the data for the team member that we want.

And finally let's update our query to populate the rest of our `blocks` in our dynamic zone.

Here is the final query we will use:

```tsx
{
  populate: {
    photo: {
      fields: ['alternativeText', 'name', 'url']
    },
    blocks: {
      on: {
        'blocks.testimonial': {
          populate: {
            photo: {
              fields: ['alternativeText', 'name', 'url']
            }
          }
        },
        'blocks.spoiler': {
          populate: true
        },
        'blocks.rich-text': {
          populate: true
        }
      }
    }
  },
  filters: {
    slug: {
      $eq: "sarah" // This is the slug for our team member
    }
  }
}

```

And here is the response we should see:

Notice how we are now seeing our `testimonial`, `spoiler` and `rich-text` components in the response.

Finally, let's start working out our `Team Member Detail` page.

## Building Our Team Member Detail Page

In our **Next.js** project we will start by creating a new file in our `app/team-member` folder and name it `[slug]` and inside lets add `page.tsx`.

By naming our folder `[slug]` it will turn are normal route into a dynamic route, you can learn more about dynamic routes [here](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes).

Let's add the following code to our `[slug]/page.tsx` file:

```tsx
export default function TeamMemberDetail() {
  return (
    <div>
      <h1>Team Member Detail</h1>
    </div>
  );
}
```

Now when we click on any of the team members in our `Our Team` page we should see our `Team Member Detail` page.

![Team Member Detail Page](/images/030-team-member-detail-page.png)

**How To Get Our Slugs From The Params In Next.js**

Now let's take a look how we can access our params in order to get our `slug` so we can use it to fetch our team member data.

In our `[slug]/page.tsx` component we are able to access our `slug` by accessing the `params` object.

We will start by adding the following code to our component:

```tsx
export default function TeamMemberDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) <p>No member found</p>;

  return (
    <div>
      <h1>Team Member Detail</h1>
      <p>{slug}</p>
    </div>
  );
}
```

Nice, now when we navigate to our `Team Member Detail` page we should see the name our our team member.

![Team Member Detail Page](/images/031-team-member-detail-page-2.gif)

Before styling our page, let's start by fetching our team member data.

Let's start by creating a new function that will fetch our team member data. We will name it `getTeamMember` and adding it to our `[slug]/page.tsx` file.

Here is what the code should look like:

```tsx
import qs from "qs";

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

export default async function TeamMemberDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) <p>No member found</p>;

  const teamMember = await getTeamMember(slug);

  return (
    <div>
      <h1>Team Member Detail</h1>
      <p>{slug}</p>
      <pre>{JSON.stringify(teamMember, null, 2)}</pre>
    </div>
  );
}
```

In the code above we are using the `getTeamMember` function to fetch our team member data. We are passing in our `slug` as an argument to the function. We are then returning the team member data to our component.

Notice how we are passing our search query to `ulr.search` based on the populate logic we created earlier.

We are also using the `pre` tag to display our team member data in a readable format.

![Team Member Detail Page](/images/032-team-member-detail-page-3.png)

Now let's start by adding some basic styling to our `Team Member Detail` page.

We will add the following code to our `[slug]/page.tsx` file:

```tsx
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
```

For the above code to work we need to make sure to create our new **BlockRenderer** component and all the other components that we are using in our `Team Member Detail` page.

Let's do that now.

Let's create a new folder in our `app/components` folder and name it `blocks` with in that folder let's create a new file and name it `index.tsx`.

Now let's create the following components in our `blocks` folder:

1. `spoiler-block.tsx`
2. `testimonial-block.tsx`
3. `rich-text-block.tsx`

**Spoiler Block**

Here is what the `spoiler-block.tsx` file should look like:

``` jsx
"use client";

import { useState } from "react";

export interface SpoilerBlock {
  __component: "blocks.spoiler";
  id: number;
  title: string;
  content: string;
}

export function SpoilerBlock({ block }: { block: SpoilerBlock }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full mb-4 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out">
      <button
        className={`w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out ${
          isExpanded ? "bg-gray-200" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="text-lg font-semibold text-gray-800">
          {block.title}
        </span>
        <span
          className={`text-2xl text-gray-600 transition-transform duration-300 ease-in-out ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        >
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[1000px]" : "max-h-0"
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="p-4 bg-white text-gray-700 leading-relaxed">
          {block.content}
        </div>
      </div>
    </div>
  );
}

```

**Testimonial Block**

Here is what the `testimonial-block.tsx` file should look like:

```tsx
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

```

**Rich Text Block**
Here is what the `rich-text-block.tsx` file should look like:

```jsx
"use client";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";

export interface RichTextBlock {
  __component: "blocks.rich-text";
  id: number;
  content: BlocksContent;
}

// This renderer is using Strapi's Rich Text renderer.
// https://github.com/strapi/blocks-react-renderer

export function RichTextBlock({ block }: { block: RichTextBlock }) {
  return (
    <div className="richtext">
      <BlocksRenderer
        content={block.content}
      blocks={{
        image: ({ image }) => {
          console.log("image", image);
          if (!image) return null;
          return (
            <div className="my-4 flex justify-center">
              <Image
                src={image.url}
                width={image.width || 800}
                height={image.height || 600}
                alt={image.alternativeText || ""}
                className="rounded-lg shadow-md h-[300px] w-full object-cover"
              />
            </div>
          );
        },
        }}
      />
    </div>
  );
}

```

This component is using Strapi's Rich Text renderer. You can learn more about it [here](https://github.com/strapi/blocks-react-renderer);

To style our Rich Text component we are using Tailwind CSS. Here is what I added in the `global.css` file:

```css

/* Rich Text Block Start */

.richtext h1, .richtext h2, .richtext h3, .richtext h4, .richtext h5, .richtext h6 {
  @apply font-bold leading-tight;
}

.richtext h1 {
  @apply text-4xl mb-6 text-gray-900 dark:text-gray-100;
}

.richtext h2 {
  @apply text-3xl mb-4 text-gray-800 dark:text-gray-200;
}

.richtext h3 {
  @apply text-2xl mb-3 text-gray-700 dark:text-gray-300;
}

.richtext h4 {
  @apply text-xl mb-2 text-gray-600 dark:text-gray-400;
}

.richtext h5 {
  @apply text-lg mb-2 text-gray-600 dark:text-gray-400;
}

.richtext h6 {
  @apply text-base mb-2 text-gray-600 dark:text-gray-400;
}

.richtext p {
  @apply mb-4 text-gray-700 dark:text-gray-300 leading-relaxed;
}

.richtext blockquote {
  @apply border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 italic my-8 p-4 rounded-r-lg;
}

.richtext a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.richtext ul, .richtext ol {
  @apply mb-4 pl-8;
}

.richtext ul {
  @apply list-disc;
}

.richtext ol {
  @apply list-decimal;
}

/* Rich Text Block End */
```

Nice, now that we have all of our components let's add the following code in our `components/blocks/index.tsx` file:

```tsx
import { RichTextBlock} from "./rich-text-block";
import { TestimonialBlock } from "./testimonial-block";
import { SpoilerBlock } from "./spoiler-block";


type TeamPageBlock = SpoilerBlock | TestimonialBlock | RichTextBlock;


const blocks: Record<
  TeamPageBlock["__component"],
  React.ComponentType<{ block: TeamPageBlock }>
> = {
  "blocks.spoiler": ({ block }: { block: TeamPageBlock }) => (
    <SpoilerBlock block={block as SpoilerBlock} />
  ),
  "blocks.testimonial": ({ block }: { block: TeamPageBlock }) => (
    <TestimonialBlock block={block as TestimonialBlock} />
  ),
  "blocks.rich-text": ({ block }: { block: TeamPageBlock }) => (
    <RichTextBlock block={block as RichTextBlock} />
  ),
};


function BlockRenderer({ block }: { block: TeamPageBlock }) {
  const BlockComponent = blocks[block.__component];
  return BlockComponent ? <BlockComponent block={block} /> : null;
}


export { BlockRenderer };
export type { TeamPageBlock };
```

**Key Components:**

**Block Type Definitions (TeamPageBlock):**
The TeamPageBlock type is a union of three block types: SpoilerBlock, TestimonialBlock, and RichTextBlock. Each block represents a distinct type of content that can be displayed.

Each block component (like SpoilerBlock, TestimonialBlock, and RichTextBlock) is imported and can be rendered based on the type of block data.
Blocks Record (blocks):

The blocks object maps a block's __component field (which is a string identifier like "blocks.spoiler", "blocks.testimonial", or "blocks.rich-text") to the corresponding React component that should handle that block type.

**For example:**
When the block's __component is "blocks.spoiler", it renders the SpoilerBlock component.

Each block type is cast to the correct type using TypeScript's as keyword (block as SpoilerBlock) to ensure the correct component is used with the correct block data.
BlockRenderer Function:

The BlockRenderer component is responsible for taking a TeamPageBlock object as a prop and rendering the appropriate component based on the block's __component field.

Inside this function, blocks[block.__component] is used to retrieve the correct component for the given block. If a matching component is found, it is rendered; otherwise, null is returned (indicating no content is rendered for unrecognized block types).

**How the Block Renderer Works:**
When BlockRenderer is called with a block, it looks up the block.__component in the blocks object to find the corresponding React component.

It then renders the component, passing the block data to it.

The specific component (e.g., SpoilerBlock, TestimonialBlock, or RichTextBlock) knows how to handle and render that particular block's data.

**Example Flow:**
A TeamPageBlock (e.g., a TestimonialBlock) is passed to BlockRenderer.
BlockRenderer checks the block's __component field (e.g., "blocks.testimonial").

It finds the corresponding component (TestimonialBlock) in the blocks object.
It renders the TestimonialBlock component, passing the block as a prop, and the block content is displayed.

This pattern is useful for rendering dynamic content where blocks are of different types, and each type has its own specific rendering logic.

Nice, now that we have all of our components done, let's add some data to our team member in Strapi's admin panel and then checkout our locally running Next.js app to see our new team member page.

![Strapi Team Member](/images/033-strapi-team-member.gif)

## Conclusion

In this tutorial covered building a dynamic website using Next.js 14 and Strapi 5,  and we explored the front and backend aspects, making it accessible for beginners.

**Topics included:**
- Creating and styling components.
- Integrating Strapi as a headless CMS.
- Building a dynamic website using Next.js 14 and Strapi 5.

**Key concepts covered were:**
- **Next.js project setup:** Using TypeScript, Tailwind CSS, and the App Router.
- **Key concepts covered were:** and creating pages such as "Home," "Our Team," and "About Us."
- **Strapi integration:** Configuring Strapi to manage backend data, creating collection types (e.g., team members), and building reusable components with Dynamic Zones in Strapi.
- **Fetching data:** from Strapi's API: Using Next.js server components to pull team member data dynamically.
- **Rendering dynamic content:** Implementing a block-based content system, allowing for flexible, reusable components (e.g., SpoilerBlock, TestimonialBlock, RichTextBlock) that handle different content types.

Hope you enjoyed this tutorial. And a huge thank you to Brad from [LearnWebCode](https://www.youtube.com/watch?v=04bNEnIzCJc) for creating the video tutorial I used to write this blog post. Make sure to check out his video.

You can find the code for this tutorial [here]().

If you have any questions or feedback, please leave a comment below. Or join us on **Strapi's Discord** [here](https://discord.com/invite/strapi) for our "Strapi Open Office Hours" Monday - Friday.

Morning Session:
4 AM CST (9:00 AM GMT)

Afternoon Session:
12:30 PM CST (6:30 PM GMT)