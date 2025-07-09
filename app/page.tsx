import { InfoForm } from "@/lib/imports";

export default function Home() {
  return (
   <main className="flex-center flex-col my-8 space-y-6 md:space-y-7 lg:space-y-8">
      <h1 className="text-3xl text-white font-bold text-center">DAILY LESSON LOG</h1>
      <InfoForm />
   </main>
  );
}
