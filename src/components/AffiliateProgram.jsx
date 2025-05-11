import React from "react";
import { UserPlus, Link2, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AffiliateProgram = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#000000] text-white container mx-auto grid gap-10">
      {" "}
      {/* Top Banner */}{" "}
      <div className=" text-center">
        {" "}
        <img
          src="/images/affiliate.jpg"
          alt="Referral Banner"
          className="w-full  mb-4"
        />{" "}
        <h2 className="text-3xl font-bold text-[#ffffff]">
          Refer a friend and earn
        </h2>{" "}
      </div>
      {/* Affiliate Program Description */}
      <div className="text-[#121212] p-6 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-2 text-[#ffffff] bg-[#000000] p-2 rounded">
          OUR AFFILIATE PROGRAM
        </h1>
        <p className="mb-4 font-semibold text-black">
          Take advantage of our Invite a Friend Program
        </p>
        <p className="mb-4 text-black">
          has created an alliance program where you and your friends can earn
          simply by inviting friends and family members. You get 30% of every
          investment made by your friend and when they bring other people you
          get an additional 10%. It has never been as simple as now. You don’t
          have to have an active trading account or make deposits to earn.
        </p>
        <button className="bg-white text-black px-4 py-2 rounded">
          Refer a friend
        </button>
      </div>
      {/* How to Get Started */}
      <div className="bg-gradient-to-r from-[#00befe] to-[#a700ff] text-center p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4 text-[#ffffff]">
          IT'S EASY TO GET STARTED
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <UserPlus className="w-8 h-8 text-[#ffffff]" />
            <h2>Register</h2>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Link2 className="w-8 h-8 text-[#ffffff]" />
            <h2>Copy affiliate link</h2>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Share2 className="w-8 h-8 text-[#ffffff]" />
            <h2>Share your link</h2>
          </div>
        </div>
        <button
          onClick={() => navigate("/sign-in")}
          className="bg-white text-black px-4 py-2 rounded font-bold"
        >
          REGISTER &raquo;
        </button>
      </div>
      {/* How it Works */}
      <div className=" p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-[#ffffff] bg-[#000000] p-2 rounded">
          HOW DOES IT WORK?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">1. Create an account</h3>
              <p>
                Create an account by signing up and get your referral link in
                your Personal dashboard area.
              </p>
            </div>
            <div>
              <h3 className="font-bold">3. Earn commission</h3>
              <p>
                Receive 30% commission when your referrals makes investment, and
                when your referrals refer other people (your sub-referrals) you
                get a 10% commission. It’s a two tier affiliate program.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">2. Share referral link</h3>
              <p>
                Send your referral link to your friends via messengers or social
                networks such as WhatsApp, Skype, Telegram, Facebook, Twitter or
                Instagram and tell your friends to signup using your name as the
                referral.
              </p>
            </div>
            <div>
              <h3 className="font-bold">4. Receive commission</h3>
              <p>
                You will receive your commission once in 24 hours after
                investment have been made by your friend. Your commission is
                fully withdrawable at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;
