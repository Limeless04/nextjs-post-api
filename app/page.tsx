import GateawayForm from "@/components/main/Form";
import ResponseCard from "@/components/main/ResponseCard";
import { Suspense } from "react";
import GateawayLoading from "@/components/loading/GateawayLoading";
import ResponseCardLoading from "@/components/loading/ResponseCardLoading";
export default function Home() {
  const handleClick = () => {
    console.log("Click button");
  };
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <Suspense fallback={<GateawayLoading />}>
        <GateawayForm />
      </Suspense>
      <Suspense fallback={<ResponseCardLoading />}>
        <ResponseCard />
      </Suspense>
    </main>
  );
}
