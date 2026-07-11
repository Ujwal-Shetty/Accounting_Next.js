import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#fafafa] font-[family-name:var(--font-geist-sans)] dark:bg-black">
      <main className="flex flex-1 w-full max-w-[800px] flex-col items-start justify-between bg-white px-15 py-30 max-sm:px-6 max-sm:py-12 dark:bg-black">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-start text-left gap-6 max-sm:gap-4">
          <h1 className="max-w-80 text-[40px] font-semibold leading-[48px] tracking-[-2.4px] text-balance text-black max-sm:text-[32px] max-sm:leading-[40px] max-sm:tracking-[-1.92px] dark:text-[#ededed]">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-[440px] text-lg leading-8 text-balance text-[#666] dark:text-[#999]">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              className="font-medium text-black dark:text-[#ededed]"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              className="font-medium text-black dark:text-[#ededed]"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-row w-full max-w-[440px] gap-4 text-sm">
          <a
            className="flex justify-center items-center h-10 px-4 rounded-full border border-transparent font-medium transition-all duration-200 cursor-pointer w-fit bg-black text-[#fafafa] gap-2 hover:bg-[#383838] dark:bg-[#ededed] dark:text-black dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex justify-center items-center h-10 px-4 rounded-full border border-[#ebebeb] font-medium transition-all duration-200 cursor-pointer w-fit hover:bg-[#f2f2f2] hover:border-transparent dark:border-[#1a1a1a] dark:hover:bg-[#1a1a1a] dark:hover:border-transparent"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
