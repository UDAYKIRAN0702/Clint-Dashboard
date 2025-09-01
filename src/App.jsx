import { Routes, Route } from "react-router-dom";
import StaffLogin from "./emp dash/staf";
import DashboardLayout from "./emp dash/Dlogin";
import TodayBusines from "./emp dash/Today Business";
import Crm from "./emp dash/Crm";
import Refferal from "./emp dash/Refferal";
import Profile from "./emp dash/PROFILE/profile";
import ChangePassword from "./emp dash/PROFILE/change password";
import BankDetails from "./emp dash/PROFILE/Bank Details";
import VirtualID from "./emp dash/PROFILE/Digital ID";
import Info from "./emp dash/PROFILE/info";
import OrgTree from "./emp dash/CAT.JSX";
import Business from "./emp dash/Business ";
import Payments from "./emp dash/payment";
import TicketRaise from "./emp dash/Ticket Raise";
import Dashboard from "./emp dash/Dashboard";
import Fieldwork from "./emp dash/Fieldwork";


export default function App() {
  return (
    <Routes>
      {/* Emp Login*/}
      <Route path="/login" element={<StaffLogin/>} />
      <Route element={<DashboardLayout/>}>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/today-business" element={<TodayBusines/>} />
        <Route path="/crm" element={<Crm/>} />
        <Route path="/referral" element={<Refferal/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/password" element={<ChangePassword/>} />
        <Route path="/bank" element={<BankDetails/>} />
        <Route path="/digital-id" element={<VirtualID/>} />
        <Route path="/info" element={<Info/>} />
        <Route path="/about" element={<OrgTree/>} />
        <Route path="/business" element={<Business/>} />
        <Route path="/payment" element={<Payments/>} />
        <Route path="/ticket" element={<TicketRaise/>} />
                <Route path="/fieldwork" element={<Fieldwork/>} />

      </Route>

        {/* Marketing Manager Login*/}
      
        

    </Routes>
   
  );
}
