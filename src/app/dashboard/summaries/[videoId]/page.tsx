import { SummaryCardForm } from "@/components/forms/summary-card-form";
import { getSummaryById } from "@/data/loader";

interface ParamsProps {
  params: {
    videoId: string;
  };
}

export default async function SummaryCardRoute(props: Readonly<ParamsProps>) {
  const params = await props?.params;
  const { videoId } = params;
  const data = await getSummaryById(videoId);
  return <SummaryCardForm item={data} />;
}
