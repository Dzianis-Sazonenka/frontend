import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes } from "@/lib/utils";
import qs from "qs";

const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const res = await fetch(url.href);
    const data = await res.json();
    const flattenData = flattenAttributes(data);

    return flattenData;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const data = await getStrapiData("/api/home");

  if (!data) {
    return <div>No data found</div>;
  }

  if (!data.blocks || data.blocks.length === 0) {
    return <div>No blocks found</div>;
  }

  return (
    <div>
      <HeroSection data={data.blocks[0]} />
    </div>
  );
}
