import type { Metadata } from "next";
import { markets, marketCodes } from "@/config/markets";
import { AdminApp, type AdminMarket } from "./AdminApp";

export const metadata: Metadata = {
  title: "BolaChat admin - PowerPlays",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const adminMarkets: AdminMarket[] = marketCodes.map((code) => ({
    code,
    name: markets[code].countryName,
    comingSoon: Boolean(markets[code].comingSoon),
    example: markets[code].copy.powerPlayExample,
  }));
  return <AdminApp markets={adminMarkets} />;
}
