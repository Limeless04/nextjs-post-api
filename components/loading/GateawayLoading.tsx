export default function GateawayLoading() {
  return (
    <form className="flex flex-col space-x-4 p-4 border rounded-lg w-1/2 animate-pulse">
      <section className="flex flex-row space-x-4 p-4">
        <div className="w-[200px] h-10 bg-gray-300 rounded"></div>
        <div className="flex-grow h-10 bg-gray-300 rounded"></div>
        <div className="w-20 h-10 bg-gray-300 rounded"></div>
      </section>
      <div className="w-full h-10 bg-gray-300 rounded"></div>
    </form>
  );
}
