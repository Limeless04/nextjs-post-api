import GateawayForm from "@/components/main/Form";
import TabMenu from "@/components/main/TabMenu";
export default function Home() {
  const handleClick = () => {
    console.log("Click button");
  };
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <GateawayForm />
    </main>
  );
}
