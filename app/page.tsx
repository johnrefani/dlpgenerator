import { InfoForm } from "@/lib/imports";

export default function Home() {
  return (
   <main className="flex-1 my-8 space-y-6 mx-[16px] md:mx-[64px] lg:mx-[120px] place-items-center">
      <h1 className="text-3xl text-white font-bold text-center">DAILY LESSON LOG</h1>
      <InfoForm />
   </main>
  );
}
