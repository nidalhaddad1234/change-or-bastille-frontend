import { SvgIcon } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PersonIcon from "@mui/icons-material/Person";
import EngineeringIcon from "@mui/icons-material/Engineering";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
export const items = [
  {
    title: "Overview",
    path: "/admin/overview",
    icon: (
      <SvgIcon fontSize="small">
        <EqualizerIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Currencies",
    path: "/admin/currencies",
    icon: (
      <SvgIcon fontSize="small">
        <AttachMoneyIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Metals",
    path: "/admin/metals",
    icon: (
      <SvgIcon fontSize="small">
        <BubbleChartIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Accounts",
    path: "/admin/users",
    icon: (
      <SvgIcon fontSize="small">
        <PersonIcon />
      </SvgIcon>
    ),
  },
  {
    title: "News",
    path: "/admin/news",
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Letter",
    path: "/admin/letter",
    icon: (
      <SvgIcon fontSize="small">
        <ForwardToInboxIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Pages Seo",
    path: "/admin/seo",
    icon: (
      <SvgIcon fontSize="small">
        <TravelExploreIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Configuration",
    path: "/admin/config",
    icon: (
      <SvgIcon fontSize="small">
        <EngineeringIcon />
      </SvgIcon>
    ),
  },
];
