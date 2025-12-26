"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Info = () => {
  const router = useRouter();
  return (
    <main className="h-screen grid grid-cols-5 grid-rows-2 px-4 pt-[var(--pageInsetTop)] pb-[var(--footerReserve)] max-lg:h-fit max-lg:grid-cols-2 max-lg:grid-rows-1 max-lg:pt-[var(--pageInsetTop)] max-lg:pb-[var(--footerReserve)] mix-blend-exclusion">
      <section className="col-start-5 col-span-1 max-lg:col-start-2">
        <div className="fixed top-[var(--pageInsetTop)] right-0 px-4 flex justify-end">
          <button
            className="normal-txt cursor-pointer select-none hover:text-gray-400 transition-colors"
            onClick={() => {
              router.push("/");
            }}
          >
            Close
          </button>
        </div>

        <ul className="">
          <div className="mb-4 flex flex-col items-start gap-[.01rem]">
            <h2 className="normal-txt">Contact</h2>
            <p className="normal-txt cursor-pointer transition-all hover:opacity-50">
              gsotomayor1101@gmail.com
            </p>
            <p className="normal-txt cursor-pointer transition-all hover:opacity-50">
              201.450.5446
            </p>
          </div>
        </ul>
      </section>

<<<<<<< Updated upstream
      <section className="col-start-2 col-span-2 row-start-2 self-end max-lg:row-start-1 max-lg:col-start-1 max-lg:pt-3 max-lg:pb-2">
=======
      <section className="col-start-2 col-span-2 row-start-2 self-end max-lg:row-start-1 max-lg:col-start-1 max-lg:px-4 max-lg:py-3 max-lg:pr-16">
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        <div className="mb-4">
          <Image
            src="/gio-headshot.jpg"
            alt="Giovanni Sotomayor"
            width={400}
            height={500}
            className="w-1/2 h-auto"
            priority
          />
        </div>
        <p className="normal-txt cursor-pointer select-none">
          (b. New York, NY) Giovanni Sotomayor is a New Jersey–born
          photographer, cinematographer, and multimedia storyteller whose work
          spans concert photography, editorial portraiture, and short-form
          visual narratives. Rooted in the music and arts communities of NYC, he
          blends documentary instinct with cinematic composition across his
          photo practices.
        </p>
        <br />
        <p className="normal-txt cursor-pointer select-none">
          A former Publicity Director at WNYU, Giovanni has shaped visual
          strategy, led multimedia campaigns, and collaborated with artists,
          labels, and publications to craft authentic, narrative-driven content.
        </p>
      </section>
    </main>
  );
};

export default Info;
