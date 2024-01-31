import { useTheme } from 'next-themes';
import Image from 'next/image'
import { PageLayout } from "~/components/layout";

const PortraitTheme = () => {
  const { theme } = useTheme()
  if (theme === 'dark') {
    return (<Image
      className=""
      src="/Transparent_Machado_de_Assis_Dark.png"
      width={800}
      height={350}
      alt="Picture of the author"
    />)
  } else {
    return (<Image
      className=""
      src="/Transparent_Machado_de_Assis.png"
      width={800}
      height={350}
      alt="Picture of the author"
    />)
  }
  
}

export default function Home() {

  return (
    <PageLayout>
      <PortraitTheme />
        <h1 className="leading-none -mt-52 z-1 text-[330px] p-4 tracking-tighter font-oswald text-center font-bold 
    bg-gradient-to-tr from-rose-500 via-orange-600 to-fuchsia-400
    bg-clip-text text-transparent">
          assis
        </h1>

    </PageLayout>
  );
}


