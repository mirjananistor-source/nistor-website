
import dynamic from "next/dynamic"

const HomeClient = dynamic(
  () => import("../components/home-client"),
  { ssr: false }
)

export const dynamicPage = "force-dynamic"

export default function Home() {
  return <HomeClient />
}
